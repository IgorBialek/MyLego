import type { GetServerSideProps, NextPage } from "next";
import { getSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

import AddItem from '../components/addItem/AddItem';

const Layout = dynamic(() => import("../components/layout/Layout"), {
  ssr: false,
});

const AddItemPage: NextPage = () => {
  return (
    <Layout>
      <AddItem />
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

export default AddItemPage;
