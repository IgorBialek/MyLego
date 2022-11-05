import { doc, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { KeyboardEvent } from 'react';
import { TbFilter, TbSortAscending2, TbSortDescending2 } from 'react-icons/tb';
import { useRecoilState } from 'recoil';

import { sortAtom } from '../../atoms/dashboard/Sort';
import { firestore } from '../../firebase';
import Card from '../UI/Card/Card';
import CardCheckbox from '../UI/Card/CardCheckbox';
import CardInput from '../UI/Card/CardInput';
import CardRadioBar from '../UI/Card/CardRadioBar';
import css from './Sieve.module.css';

const Sieve = () => {
  const { data: session } = useSession();

  const [sort, setSort] = useRecoilState(sortAtom);

  const syncSort = async (obj: { [key: string]: string | boolean }) => {
    let email = session?.user?.email;

    if (email) {
      await setDoc(doc(firestore, "sorting", email), { ...sort, ...obj });
    }
  };

  const modeHandler = (value: any) => {
    syncSort({ mode: value });
  };

  const sortTypeHandler = () => {
    syncSort({ desc: !sort.desc });
  };

  const queryHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setSort((prevState) => {
      return { ...prevState, query: e.currentTarget.value };
    });
  };

  return (
    <Card customClass={css.sieveContainer}>
      <CardRadioBar
        changeHandler={modeHandler}
        selectedValue={sort.mode}
        values={["PRICE", "CHANGE", "PROFIT", "COUNT", "NAME", "THEME"]}
        names={["Price", "Change", "Profit", "Count", "Name", "Theme"]}
      />
      <CardCheckbox
        selected={sort.desc}
        unselectedContent={<TbSortAscending2 />}
        selectedContent={<TbSortDescending2 />}
        handler={sortTypeHandler}
        customClass={css.checkbox}
      />
      <CardInput
        icon={<TbFilter />}
        displayIcon={true}
        placeholder="Filter Items"
        onInput={queryHandler}
      />
    </Card>
  );
};

export default Sieve;
