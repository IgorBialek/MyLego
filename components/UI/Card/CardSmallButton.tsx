import { FC, MouseEvent, ReactElement } from 'react';

import css from './CardSmallButton.module.css';

const CardSmallButton: FC<{
  icon: ReactElement;
  handler: () => void;
}> = ({ icon, handler }) => {
  const clickHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handler();
  };

  return (
    <div
      className={css.smallButtonContainer}
      onMouseUp={clickHandler}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {icon}
    </div>
  );
};

export default CardSmallButton;
