import { doc, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { TbCurrency } from 'react-icons/tb';
import { useRecoilState, useRecoilValue } from 'recoil';

import { currenciesAtom } from '../../atoms/settings/Currencies';
import { selectedCurrencyAtom } from '../../atoms/settings/SelectedCurrency';
import { firestore } from '../../firebase';
import Card from '../UI/Card/Card';
import CardDropdown from '../UI/Card/CardDropdown';
import css from './Currency.module.css';

const Currency = () => {
  const { data: session } = useSession();
  const currencies = useRecoilValue(currenciesAtom);

  const [selectedCurrency, setSelectedCurrency] =
    useRecoilState(selectedCurrencyAtom);

  const chooseHandler = async (value: string) => {
    let email = session?.user?.email;

    if (email) {
      await setDoc(doc(firestore, "currency", email), {
        name: value,
        value: currencies![value],
      });
    }
  };

  return (
    <Card customClass={css.currencyContainer}>
      <div className={css.info}>
        <h1>Currency</h1>
        <p>{selectedCurrency.name}</p>
        <p>({selectedCurrency.value.toFixed(2)})</p>
        <a className={css.attribution} href="https://www.exchangerate-api.com">
          Rates By Exchange Rate API
        </a>
      </div>
      <CardDropdown
        values={Object.keys(currencies ?? {})}
        chooseHandler={chooseHandler}
        customItemsClass={css.customItemsContainer}
        customClass={css.customDropdown}
        icon={<TbCurrency />}
      />
    </Card>
  );
};

export default Currency;
