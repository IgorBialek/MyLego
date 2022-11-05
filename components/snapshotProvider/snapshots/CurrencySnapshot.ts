import { doc, onSnapshot } from 'firebase/firestore';
import { SetterOrUpdater } from 'recoil';

import { firestore } from '../../../firebase';

const CurrencySnapshot = (
  email: string,
  setSelectedCurrency: SetterOrUpdater<{ name: string; value: number }>
) => {
  const unsubscribeCurrency = onSnapshot(
    doc(firestore, "currency", email),
    (doc) => {
      let selectedCurrency = doc.data() as { name: string; value: number };

      if (selectedCurrency) {
        setSelectedCurrency(selectedCurrency);
      }
    }
  );

  return unsubscribeCurrency;
};

export default CurrencySnapshot;
