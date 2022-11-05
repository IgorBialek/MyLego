import { atom } from 'recoil';

export const searchedItemsFilterAtom = atom({
  key: "searchedItemsFilter",
  default: { filter: "", type: "ALL" },
});
