import { atom } from 'recoil';

export const sortAtom = atom({
  key: "sort",
  default: { mode: "PRICE", desc: true, query: "" },
});
