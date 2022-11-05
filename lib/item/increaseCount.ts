import { SetterOrUpdater } from 'recoil';

import Item from '../../models/item/item';

const increaseCount = (setItems: SetterOrUpdater<Item[]>, item: Item) => {
  setItems((prevState) =>
    prevState.map((i) => (i.id == item.id ? { ...i, count: i.count + 1 } : i))
  );
};

export default increaseCount;
