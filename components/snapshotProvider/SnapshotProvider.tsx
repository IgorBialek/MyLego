import axios from "axios";
import { doc, setDoc, Unsubscribe } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FC, Fragment, ReactNode, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { itemsAtom } from "../../atoms/dashboard/Items";
import { sortAtom } from "../../atoms/dashboard/Sort";
import { updatesAtom } from "../../atoms/dashboard/Updates";
import { LoadedStatesAtom } from "../../atoms/layout/LoadedStates";
import { themeAtom } from "../../atoms/layout/Theme";
import { currenciesAtom } from "../../atoms/settings/Currencies";
import { selectedCurrencyAtom } from "../../atoms/settings/SelectedCurrency";
import { usageAtom } from "../../atoms/settings/Usage";
import { firestore } from "../../firebase";
import CurrencySnapshot from "./snapshots/CurrencySnapshot";
import ItemsSnapshot from "./snapshots/ItemsSnapshot";
import SortingSnapshot from "./snapshots/SortingSnapshot";
import ThemeSnapshot from "./snapshots/ThemeSnapshot";
import UpdatesSnapshot from "./snapshots/UpdatesSnapshot";
import UsageSnapshot from "./snapshots/UsageSnapshot";
import { pieAtom } from "../../atoms/dashboard/Pie";
import PieSnapshot from "./snapshots/PieSnapshot";

const SnapshotProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();

  const setCurrencies = useSetRecoilState(currenciesAtom);

  const [loadedStates, setLoadedStates] = useRecoilState(LoadedStatesAtom);
  const [selectedCurrency, setSelectedCurrency] =
    useRecoilState(selectedCurrencyAtom);
  const setItems = useSetRecoilState(itemsAtom);
  const setSort = useSetRecoilState(sortAtom);
  const setPie = useSetRecoilState(pieAtom);
  const setTheme = useSetRecoilState(themeAtom);
  const setUpdates = useSetRecoilState(updatesAtom);
  const setUsage = useSetRecoilState(usageAtom);

  useEffect(() => {
    const init = async () => {
      let currencies = (
        await axios.get("https://open.er-api.com/v6/latest/EUR")
      ).data.rates;
      setCurrencies(currencies);

      if (currencies[selectedCurrency.name] !== selectedCurrency.value) {
        let email = session?.user?.email;

        if (email) {
          await setDoc(doc(firestore, "currency", email), {
            name: selectedCurrency.name,
            value: currencies[selectedCurrency.name],
          });
        }
      }
    };

    init();
  }, [setCurrencies, selectedCurrency]);

  useEffect(() => {
    let email = session?.user?.email;
    let unsubscribes: Unsubscribe[] = [];

    if (email) {
      unsubscribes = [
        ItemsSnapshot(email, setItems, setLoadedStates, loadedStates),
        UpdatesSnapshot(email, setUpdates, setLoadedStates, loadedStates),
        SortingSnapshot(email, setSort, setLoadedStates, loadedStates),
        PieSnapshot(email, setPie, setLoadedStates, loadedStates),
        CurrencySnapshot(email, setSelectedCurrency),
        ThemeSnapshot(email, setTheme),
        UsageSnapshot(setUsage),
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
