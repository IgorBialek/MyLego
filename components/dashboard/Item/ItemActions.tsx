import { useSession } from 'next-auth/react';
import { Dispatch, FC, Fragment, SetStateAction } from 'react';
import { TbMinus, TbPlus, TbTrash, TbX } from 'react-icons/tb';
import { useRecoilState } from 'recoil';

import { itemsAtom } from '../../../atoms/dashboard/Items';
import syncItems from '../../../lib/syncItems';
import Item from '../../../models/item/item';
import CardPrimaryButton from '../../UI/Card/CardPrimaryButton';
import CardSecondaryButton from '../../UI/Card/CardSecondaryButton';
import css from './ItemActions.module.css';

const ItemActions: FC<{
  item: Item;
  setShowActions: Dispatch<SetStateAction<boolean>>;
}> = ({ item, setShowActions }) => {
  const { data: session } = useSession();
  let email = session?.user?.email;

  const [items, setItems] = useRecoilState(itemsAtom);

  const closeHandler = () => {
    setShowActions(false);
  };

  const verifyUser = (func: () => void) => {
    if (email) {
      func();
    }
  };

  const decreaseHandler = () => {
    verifyUser(async () => {
      if (item.count > 1) {
        await syncItems(
          items.map((i) =>
            i.id == item.id ? { ...i, count: i.count - 1 } : i
          ),
          email
        );
      } else {
        deleteHandler();
      }
    });
  };

  const increaseHandler = () => {
    verifyUser(async () => {
      await syncItems(
        items.map((i) => (i.id == item.id ? { ...i, count: i.count + 1 } : i)),
        email
      );
    });
  };

  const deleteHandler = () => {
    verifyUser(async () => {
      await syncItems(
        items.filter((i) => i.id != item.id),
        email
      );
    });
  };

  return (
    <Fragment>
      <CardSecondaryButton
        icon={<TbX />}
        handler={closeHandler}
        customClass={css.closeActions}
      />
      <div className={`${css.countContainer} center`}>
        <CardSecondaryButton
          icon={<TbMinus />}
          handler={decreaseHandler}
          customClass={css.countControl}
        />
        <p>{item.count}</p>
        <CardSecondaryButton
          icon={<TbPlus />}
          handler={increaseHandler}
          customClass={css.countControl}
        />
      </div>
      <CardPrimaryButton
        icon={<TbTrash />}
        handler={deleteHandler}
        customClass={css.deleteFix}
      />
    </Fragment>
  );
};

export default ItemActions;
