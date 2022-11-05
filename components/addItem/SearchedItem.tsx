import Image from 'next/image';
import { FC } from 'react';
import { TbClipboardCheck } from 'react-icons/tb';
import { useRecoilState } from 'recoil';

import { selectedItemsAtom } from '../../atoms/addItem/SelectedItems';
import Item from '../../models/item/item';
import Card from '../UI/Card/Card';
import CardCheckbox from '../UI/Card/CardCheckbox';
import CardInfo from '../UI/Card/CardInfo';
import css from './SearchedItem.module.css';

const SearchedItem: FC<{ item: Item }> = ({ item }) => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsAtom);

  const selectHandler = () => {
    if (selectedItems.filter((i) => i.id === item.id).length > 0) {
      setSelectedItems((prevState) =>
        prevState.filter((i) => i.id !== item.id)
      );
    } else {
      setSelectedItems((prevState) => [...prevState, item]);
    }
  };

  return (
    <Card customClass={css.itemContainer}>
      <div className={`${css.itemImageContainer} center`}>
        <Image
          alt=": ("
          src={item.image}
          width={"100%"}
          height={"100%"}
          objectFit={"contain"}
        />
      </div>
      <CardInfo text={item.name} customClass={css.itemInfo} />
      <CardCheckbox
        handler={selectHandler}
        selected={selectedItems.filter((i) => i.id === item.id).length > 0}
        customClass={css.marginTop}
        unselectedContent={
          <div>
            <TbClipboardCheck />
            Selected
          </div>
        }
        selectedContent={<div>Click to select</div>}
      />
    </Card>
  );
};

export default SearchedItem;
