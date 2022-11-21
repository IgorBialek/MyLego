import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { SetterOrUpdater } from 'recoil';

import { firestore } from '../../../firebase';
import Usage from '../../../models/app/usage';

const UsageSnapshot = (setUsage: SetterOrUpdater<Usage | null>) => {
  const unsubscribeTheme = onSnapshot(
    doc(firestore, "app", "usage"),
    async (document) => {
      let usage = document.data() as Usage;

      if (usage) {
        let date = new Date();
        let dateUTC = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;

        if (usage.lastResetDate !== dateUTC) {
          await setDoc(doc(firestore, "app", "usage"), {
            bricklink: 5000,
            brickset: 1000,
            lastResetDate: dateUTC,
          });
          return;
        }

        setUsage(usage);
      }
    }
  );

  return unsubscribeTheme;
};

export default UsageSnapshot;
