import { doc, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { TbCheck } from 'react-icons/tb';
import { useRecoilState } from 'recoil';

import { themeAtom } from '../../atoms/layout/Theme';
import { firestore } from '../../firebase';
import Card from '../UI/Card/Card';
import css from './Theme.module.css';

const Theme = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const { data: session } = useSession();

  const palletes = [
    ["bd5555", "e06767", "fcbbbb", "facdcd", "fae3e3", "fffafa"],
    ["bd9a55", "e0b867", "fce7bb", "faebcd", "faf2e3", "fffdfa"],
    ["9abd55", "b8e067", "e7fcbb", "ebfacd", "f2fae3", "fdfffa"],
    ["55bd55", "67e067", "bbfcbb", "cdfacd", "e3fae3", "fafffa"],
    ["55bd9a", "67e0b8", "bbfce7", "cdfaeb", "e3faf2", "fafffd"],
    ["559abd", "67b8e0", "bbe7fc", "cdebfa", "e3f2fa", "fafdff"],
    ["5555bd", "6767e0", "bbbbfc", "cdcdfa", "e3e3fa", "fafaff"],
    ["9a55bd", "b867e0", "e7bbfc", "ebcdfa", "f2e3fa", "fdfaff"],
    ["bd559a", "e067b8", "fcbbe7", "facdeb", "fae3f2", "fffafd"],
  ];

  const selectHandler = async (pallete: string[]) => {
    let email = session?.user?.email;

    if (email) {
      await setDoc(doc(firestore, "theme", email), { pallete: pallete });
      //setTheme(pallete);
    }
  };

  return (
    <Card customClass={css.themeContainer}>
      <h1>Theme</h1>
      <div className={`${css.palleteContainer} center`}>
        {palletes.map((pallete) => (
          <div
            key={pallete[0]}
            className={`${css.pallete} center`}
            style={{ backgroundColor: "#" + pallete[1] }}
            onClick={() => selectHandler(pallete)}
          >
            {theme[0] == pallete[0] && (
              <span>
                <TbCheck />
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Theme;
