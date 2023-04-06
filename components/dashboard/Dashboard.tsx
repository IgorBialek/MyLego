import Head from "next/head";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue } from "recoil";

import { LoadedStatesAtom } from "../../atoms/layout/LoadedStates";
import css from "./Dashboard.module.css";
import ItemList from "./Item/ItemList";
import Panel from "./Panel";
import Sieve from "./Sieve";
import PiePanel from "./PiePanel";

const Dashboard = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const hideSieve = useMediaQuery({ maxWidth: 1895 });
  const hidePiePanel = useMediaQuery({ maxWidth: 1385 });
  const loadedStates = useRecoilValue(LoadedStatesAtom);

  return (
    <div
      className={
        isMobile ? css.mobileDashboardContainer : css.dashboardContainer
      }
    >
      <Head>
        <title>Dashboard</title>
      </Head>

      <div
        className={css.topContainer}
        style={{ width: hideSieve ? "100%" : "auto" }}
      >
        {loadedStates.items && loadedStates.updates && <Panel />}
        {loadedStates.sorting && (!hideSieve || isMobile) && <Sieve />}
        {loadedStates.items &&
          loadedStates.pie &&
          (!hidePiePanel || isMobile) && <PiePanel />}
      </div>
      {loadedStates.items && <ItemList />}
    </div>
  );
};

export default Dashboard;
