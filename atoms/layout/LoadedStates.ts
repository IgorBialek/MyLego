import { atom } from 'recoil';

export const LoadedStatesAtom = atom({
  key: "loadedStates",
  default: { items: false, updates: false, sorting: false },
});
