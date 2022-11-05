import { atom } from 'recoil';

export const modalChildAtom = atom<{
  id: string;
  title?: string;
  text?: string;
  images?: string[] | null;
  handler?: () => void;
}>({
  key: "modalChild",
  default: { id: "", title: "", text: "", images: null, handler: () => {} },
});
