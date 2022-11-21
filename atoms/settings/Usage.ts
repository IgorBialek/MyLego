import { atom } from 'recoil';

import Usage from '../../models/app/usage';

export const usageAtom = atom<Usage | null>({
  key: "usage",
  default: null,
});
