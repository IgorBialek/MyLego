import { atom } from "recoil";
import Update from "../../models/update/update";

export const updatesAtom = atom<Update[]>({
  key: "updates",
  default: [],
});
