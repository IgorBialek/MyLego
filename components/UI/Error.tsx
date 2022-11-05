import { FC } from 'react';

import CardPrimaryButton from './Card/CardPrimaryButton';
import css from './Error.module.css';

const Error: FC<{ title: string; text: string; handler: () => void }> = ({
  title,
  text,
  handler,
}) => {
  return (
    <div className={`${css.errorContainer} center`}>
      <h1>{title}</h1>
      <p>{text}</p>
      <CardPrimaryButton
        text="Okey"
        handler={handler}
        customClass={css.alignEnd}
      />
    </div>
  );
};

export default Error;
