import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getProviders } from 'next-auth/react';

import ProvidersList from '../../components/auth/ProvidersList';

const SignInPage: NextPage = ({
  providers,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  return <ProvidersList providers={providers} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default SignInPage;
