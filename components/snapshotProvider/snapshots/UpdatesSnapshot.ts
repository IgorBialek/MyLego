import { doc, onSnapshot } from "firebase/firestore";
import { SetterOrUpdater } from "recoil";

import { firestore } from "../../../firebase";
import Update from "../../../models/update/update";
import Loaded from "../../../models/app/loaded";

const UpdatesSnapshot = (
  email: string,
  setUpdates: SetterOrUpdater<Update[]>,
  setLoadedStates: SetterOrUpdater<Loaded>,
  loadedStates: Loaded
) => {
  const unsubscribeUpdates = onSnapshot(
    doc(firestore, "updates", email),
    (doc) => {
      let updates = doc.data()?.updates;

      if (updates) {
        setUpdates(updates);
      }

      if (!loadedStates.updates) {
        setLoadedStates((prevState) => {
          return { ...prevState, updates: true };
        });
      }
    }
  );

  return unsubscribeUpdates;
};

export default UpdatesSnapshot;
