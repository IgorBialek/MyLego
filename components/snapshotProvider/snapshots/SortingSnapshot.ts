import { doc, onSnapshot } from "firebase/firestore";
import { SetterOrUpdater } from "recoil";

import { firestore } from "../../../firebase";
import Loaded from "../../../models/app/loaded";

const SortingSnapshot = (
  email: string,
  setSort: SetterOrUpdater<{ mode: string; desc: boolean; query: string }>,
  setLoadedStates: SetterOrUpdater<Loaded>,
  loadedStates: Loaded
) => {
  const unsubscribeSorting = onSnapshot(
    doc(firestore, "sorting", email),
    (doc) => {
      let sort = doc.data() as {
        mode: string;
        desc: boolean;
      };

      if (sort) {
        setSort({ ...sort, query: "" });
      }

      if (!loadedStates.sorting) {
        setLoadedStates((prevState) => {
          return { ...prevState, sorting: true };
        });
      }
    }
  );

  return unsubscribeSorting;
};

export default SortingSnapshot;
