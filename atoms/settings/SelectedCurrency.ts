import { atom } from 'recoil';

export const selectedCurrencyAtom = atom({
  key: "SelectedCurrency",
  default: { name: "EUR", value: 1 },
});
