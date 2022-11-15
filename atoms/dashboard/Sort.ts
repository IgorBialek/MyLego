import { atom } from 'recoil';

export const sortAtom = atom<{ mode: string; desc: boolean; query: string }>({
  key: "sort",
  default: { mode: "PRICE", desc: true, query: "" },
});
