import { doc, onSnapshot } from 'firebase/firestore';
import { SetterOrUpdater } from 'recoil';

import { firestore } from '../../../firebase';

const ThemeSnapshot = (email: string, setTheme: SetterOrUpdater<string[]>) => {
  const unsubscribeTheme = onSnapshot(doc(firestore, "theme", email), (doc) => {
    let pallete = doc.data()?.pallete as string[];

    if (pallete) {
      setTheme(pallete);
      pallete.forEach((color, i) => {
        document.documentElement.style.setProperty(
          `--color-${i + 1}`,
          "#" + color
        );
      });
    } else {
      setTheme(["5555bd", "6767e0", "bbbbfc", "cdcdfa", "e3e3fa", "fafaff"]);
      ["5555bd", "6767e0", "bbbbfc", "cdcdfa", "e3e3fa", "fafaff"].forEach(
        (color, i) => {
          document.documentElement.style.setProperty(
            `--color-${i + 1}`,
            "#" + color
          );
        }
      );
    }
  });

  return unsubscribeTheme;
};

export default ThemeSnapshot;
