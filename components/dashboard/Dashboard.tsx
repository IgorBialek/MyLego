import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';
import { useRecoilValue } from 'recoil';

import { LoadedStatesAtom } from '../../atoms/layout/LoadedStates';
import css from './Dashboard.module.css';
import ItemList from './Item/ItemList';
import Panel from './Panel';
import Sieve from './Sieve';

const Dashboard = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
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

      <div className={css.topContainer}>
        {loadedStates.items && loadedStates.updates && <Panel />}
        {loadedStates.sorting && <Sieve />}
      </div>
      {loadedStates.items && <ItemList />}
    </div>
  );
};

export default Dashboard;
