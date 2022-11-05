import { atom } from 'recoil';

export const currentItemAtom = atom<{
  id: string;
  setID: number | null;
  image: string;
} | null>({
  key: "currentItem",
  default: null,
});
