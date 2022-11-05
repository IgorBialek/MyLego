import Image from 'next/image';
import { FC } from 'react';
import { TbCheckupList, TbMinus, TbPlus } from 'react-icons/tb';
import { useMediaQuery } from 'react-responsive';
import { useSetRecoilState } from 'recoil';

import { selectedItemsAtom } from '../../atoms/addItem/SelectedItems';
import decreaseCount from '../../lib/item/decreaseCount';
import increaseCount from '../../lib/item/increaseCount';
import Item from '../../models/item/item';
import CardSecondaryButton from '../UI/Card/CardSecondaryButton';
import css from './FinalizeItem.module.css';

const FinalizeItem: FC<{ item: Item; repeated: boolean }> = ({
  item,
  repeated,
}) => {
  const setSelectedItems = useSetRecoilState(selectedItemsAtom);
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  return (
    <div className={css.finalizeItemContainer}>
      <Image
        alt="Upsss"
        src={item.image}
        width={"100%"}
        height={"100%"}
        objectFit={"contain"}
      />

      {!isMobile && (
        <>
          <p className={css.id}>{item.id}</p>
          <p className={css.name}>{item.name}</p>
        </>
      )}

      <div
        className={`${
          isMobile ? css.mobileCountContainer : css.countContainer
        } center`}
      >
        {repeated && <TbCheckupList />}
        <CardSecondaryButton
          icon={<TbMinus />}
          handler={() => decreaseCount(setSelectedItems, item)}
          customClass={css.countControl}
        />
        <p>{item.count}</p>
        <CardSecondaryButton
          icon={<TbPlus />}
          handler={() => increaseCount(setSelectedItems, item)}
          customClass={css.countControl}
        />
      </div>
    </div>
  );
};

export default FinalizeItem;
