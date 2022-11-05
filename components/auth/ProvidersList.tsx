import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import Head from 'next/head';
import { FC } from 'react';

import css from './ProvidersList.module.css';

const ProvidersList: FC<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}> = ({ providers }) => {
  return (
    <div className={`${css.signInContainer} center`}>
      <Head>
        <title>Sign In</title>
      </Head>

      {providers &&
        Object.values(providers).map((v: { id: string; name: string }) => {
          return (
            <button
              key={v.id}
              className={`button-primary`}
              onClick={() => {
                signIn(v.id, {
                  callbackUrl: "/guide",
                });
              }}
            >
              {v.name}
            </button>
          );
        })}
    </div>
  );
};

export default ProvidersList;
