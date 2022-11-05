import { FC, ReactElement } from 'react';

import css from './CardInfo.module.css';

const CardInfo: FC<{
  icon?: ReactElement;
  text: string;
  customClass?: string;
}> = ({ icon, text, customClass }) => {
  return (
    <div className={`${css.cardInfo} ${customClass}`}>
      {icon && <span className="center">{icon}</span>}
      <p>{text}</p>
    </div>
  );
};

export default CardInfo;
