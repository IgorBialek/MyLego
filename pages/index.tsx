import type { GetServerSideProps, NextPage } from "next";
import { getSession } from 'next-auth/react';

import Home from '../components/home/Home';

const HomePage: NextPage = () => {
  return <Home />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default HomePage;
