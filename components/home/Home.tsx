import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { FC } from 'react';

import css from './Home.module.css';

const Home: FC = () => {
  return (
    <div className={`${css.homeContainer} center`}>
      <Head>
        <title>Home</title>
      </Head>

      <div className={`${css.contentContainer} center`}>
        <h1>Let us help you out</h1>
        <h2>and take care of your legos</h2>
        <button
          className={`button-primary`}
          onClick={() => {
            signIn();
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Home;
