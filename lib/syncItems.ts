import { doc, setDoc } from 'firebase/firestore';

import { firestore } from '../firebase';
import Item from '../models/item/item';

const syncItems = async (items: Item[], email: string | null | undefined) => {
  if (email) {
    await setDoc(doc(firestore, "items", email), {
      items: items,
    });
  }
};

export default syncItems;
