import { signOut, useSession } from 'next-auth/react';
import { TbMail, TbUser } from 'react-icons/tb';

import Card from '../UI/Card/Card';
import CardInfo from '../UI/Card/CardInfo';
import CardPrimaryButton from '../UI/Card/CardPrimaryButton';
import css from './Account.module.css';

const Account = () => {
  const { data: session } = useSession();

  return (
    <Card customClass={css.accountContainer}>
      <h1>Account</h1>
      <CardInfo
        text={session?.user?.name ?? "Something went wrong"}
        icon={<TbUser />}
      />
      <CardInfo
        text={session?.user?.email ?? "Something went wrong"}
        icon={<TbMail />}
      />
      <CardPrimaryButton text="Sign Out" marginTop={true} handler={signOut} />
    </Card>
  );
};

export default Account;
