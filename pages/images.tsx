import { getSession } from 'next-auth/react';

import Images from '../components/images/Images';

import type { GetServerSideProps, NextPage } from "next";
const ImagesPage: NextPage = () => {
  return <Images />;
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

export default ImagesPage;
