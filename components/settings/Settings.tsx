import Head from 'next/head';

import Account from './Account';
import Currency from './Currency';
import css from './Settings.module.css';
import Theme from './Theme';

const Settings = () => {
  return (
    <div className={`${css.settingsContainer} center`}>
      <Head>
        <title>Settings</title>
      </Head>

      <Account />
      <Currency />
      <Theme />
    </div>
  );
};

export default Settings;
