import type { GetServerSideProps, NextPage } from "next";
import { getSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

import Settings from '../components/settings/Settings';

const Layout = dynamic(() => import("../components/layout/Layout"), {
  ssr: false,
});

const SettingsPage: NextPage = () => {
  return (
    <Layout>
      <Settings />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SettingsPage;
