import { doc, onSnapshot } from 'firebase/firestore';
import { SetterOrUpdater } from 'recoil';

import { firestore } from '../../../firebase';

const SortingSnapshot = (
  email: string,
  setSort: SetterOrUpdater<{ mode: string; desc: boolean; query: string }>,
  setLoadedStates: SetterOrUpdater<{
    items: boolean;
    updates: boolean;
    sorting: boolean;
  }>,
  loadedStates: {
    items: boolean;
    updates: boolean;
    sorting: boolean;
  }
) => {
  const unsubscribeSorting = onSnapshot(
    doc(firestore, "sorting", email),
    (doc) => {
      let sort = doc.data() as {
        query: string;
        mode: string;
        desc: boolean;
      };

      if (sort) {
        setSort(sort);
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
