import { SetterOrUpdater } from 'recoil';

import Item from '../../models/item/item';

const decreaseCount = (setItems: SetterOrUpdater<Item[]>, item: Item) => {
  if (item.count > 1) {
    setItems((prevState) =>
      prevState.map((i) => (i.id == item.id ? { ...i, count: i.count - 1 } : i))
    );
  } else {
    setItems((prevState) => prevState.filter((i) => i.id != item.id));
  }
};

export default decreaseCount;
