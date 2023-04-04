import { doc, onSnapshot } from "firebase/firestore";
import { SetterOrUpdater } from "recoil";

import { firestore } from "../../../firebase";
import Loaded from "../../../models/app/loaded";

const PieSnapshot = (
  email: string,
  setPie: SetterOrUpdater<{ mode: string }>,
  setLoadedStates: SetterOrUpdater<Loaded>,
  loadedStates: Loaded
) => {
  const unsubscribeSorting = onSnapshot(doc(firestore, "pie", email), (doc) => {
    let sort = doc.data() as {
      mode: string;
    };

    if (sort) {
      setPie({ mode: sort.mode });
    }

    if (!loadedStates.sorting) {
      setLoadedStates((prevState) => {
        return { ...prevState, pie: true };
      });
    }
  });

  return unsubscribeSorting;
};

export default PieSnapshot;
