import { atom } from 'recoil';

import Item from '../../models/item/item';

export const searchedItemsAtom = atom<Item[] | null>({
  key: "searchedItems",
  default: null,
});
