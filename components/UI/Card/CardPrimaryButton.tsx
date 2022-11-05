import { FC, ReactElement } from 'react';

import css from './CardPrimaryButton.module.css';

const CardPrimaryButton: FC<{
  text?: string;
  marginTop?: boolean;
  icon?: ReactElement;
  customClass?: string;
  handler: (...args: any[]) => void;
}> = ({ text, marginTop, icon, customClass, handler }) => {
  return (
    <button
      className={`${css.cardButton} center ${text && css.iconMargin} ${
        marginTop && "marginTop"
      } ${customClass}`}
      onClick={() => {
        handler();
      }}
    >
      {icon && <span className="center">{icon}</span>}
      <div>{text}</div>
    </button>
  );
};

export default CardPrimaryButton;
