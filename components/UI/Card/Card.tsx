import { FC, PropsWithChildren, ReactEventHandler } from 'react';

import css from './Card.module.css';

const Card: FC<
  PropsWithChildren<{
    customClass?: string;
    onClick?: ReactEventHandler;
    onMouseDown?: ReactEventHandler;
    onMouseUp?: ReactEventHandler;
    onContextMenu?: ReactEventHandler;
  }>
> = ({
  children,
  customClass,
  onClick,
  onMouseDown,
  onMouseUp,
  onContextMenu,
}) => {
  return (
    <div
      className={`${css.card} ${customClass}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onContextMenu={onContextMenu}
    >
      {children}
    </div>
  );
};

export default Card;
