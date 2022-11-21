import { atom } from 'recoil';

import Item from '../../models/item/item';

export const itemsAtom = atom<Item[]>({
  key: "items",
  default: [],
});
