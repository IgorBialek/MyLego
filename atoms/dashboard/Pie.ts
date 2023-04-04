import { atom } from "recoil";

export const pieAtom = atom<{ mode: string }>({
  key: "pie",
  default: { mode: "THEME" },
});
