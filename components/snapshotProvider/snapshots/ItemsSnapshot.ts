import { doc, onSnapshot } from 'firebase/firestore';
import { SetterOrUpdater } from 'recoil';

import { firestore } from '../../../firebase';
import Item from '../../../models/item/item';

const ItemsSnapshot = (
  email: string,
  setItems: SetterOrUpdater<Item[]>,
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
  const unsubscribeItems = onSnapshot(doc(firestore, "items", email), (doc) => {
    let items = doc.data()?.items;

    if (items) {
      setItems(items);
    }

    if (!loadedStates.items) {
      setLoadedStates((prevState) => {
        return { ...prevState, items: true };
      });
    }
  });

  return unsubscribeItems;
};

export default ItemsSnapshot;
