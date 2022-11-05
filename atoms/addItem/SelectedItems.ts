import { atom } from 'recoil';

import Item from '../../models/item/item';

export const selectedItemsAtom = atom<Item[]>({
  key: "selectedItems",
  default: [],
});
