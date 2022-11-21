import { atom } from 'recoil';

export const modalChildAtom = atom<{
  id: string;
  title?: string;
  text?: string;
  handler?: () => void;
}>({
  key: "modalChild",
  default: { id: "", title: "", text: "", handler: () => {} },
});
