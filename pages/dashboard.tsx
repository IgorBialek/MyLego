import type { GetServerSideProps, NextPage } from "next";
import { getSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

import Dashboard from '../components/dashboard/Dashboard';

const Layout = dynamic(() => import("../components/layout/Layout"), {
  ssr: false,
});

const DashboardPage: NextPage = () => {
  return (
    <Layout>
      <Dashboard />
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

export default DashboardPage;
