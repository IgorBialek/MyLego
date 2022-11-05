import axios from 'axios';
import { Unsubscribe } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { FC, Fragment, ReactNode, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { itemsAtom } from '../../atoms/dashboard/Items';
import { sortAtom } from '../../atoms/dashboard/Sort';
import { updatesAtom } from '../../atoms/dashboard/Updates';
import { LoadedStatesAtom } from '../../atoms/layout/LoadedStates';
import { themeAtom } from '../../atoms/layout/Theme';
import { currenciesAtom } from '../../atoms/settings/Currencies';
import { selectedCurrencyAtom } from '../../atoms/settings/SelectedCurrency';
import CurrencySnapshot from './snapshots/CurrencySnapshot';
import ItemsSnapshot from './snapshots/ItemsSnapshot';
import SortingSnapshot from './snapshots/SortingSnapshot';
import ThemeSnapshot from './snapshots/ThemeSnapshot';
import UpdatesSnapshot from './snapshots/UpdatesSnapshot';

const SnapshotProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();

  const setCurrencies = useSetRecoilState(currenciesAtom);

  const [loadedStates, setLoadedStates] = useRecoilState(LoadedStatesAtom);
  const setSelectedCurrency = useSetRecoilState(selectedCurrencyAtom);
  const setItems = useSetRecoilState(itemsAtom);
  const setSort = useSetRecoilState(sortAtom);
  const setTheme = useSetRecoilState(themeAtom);
  const setUpdates = useSetRecoilState(updatesAtom);

  useEffect(() => {
    const init = async () => {
      let currencies = (await axios.get("https://api.exchangerate.host/latest"))
        .data.rates;
      setCurrencies(currencies);
    };

    init();
  }, [setCurrencies]);

  useEffect(() => {
    let email = session?.user?.email;
    let unsubscribes: Unsubscribe[] = [];

    if (email) {
      unsubscribes = [
        ItemsSnapshot(email, setItems, setLoadedStates, loadedStates),
        UpdatesSnapshot(email, setUpdates, setLoadedStates, loadedStates),
        SortingSnapshot(email, setSort, setLoadedStates, loadedStates),
        CurrencySnapshot(email, setSelectedCurrency),
        ThemeSnapshot(email, setTheme),
      ];
    }

    return () => {
      unsubscribes.forEach((u) => {
        u();
      });
    };
  }, [session]);

  return <Fragment>{children}</Fragment>;
};

export default SnapshotProvider;
