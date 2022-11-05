import { FC, Fragment } from 'react';
import { TbArrowNarrowDown, TbArrowNarrowUp } from 'react-icons/tb';

import css from './Indicator.module.css';

const Indicator: FC<{
  initValue: number;
  newValue: number;
  customClass?: string;
}> = ({ initValue, newValue, customClass }) => {
  const profit = newValue - initValue;

  return (
    <div
      className={`${customClass} ${
        profit >= 0 ? css.positive : css.negative
      } center`}
    >
      {initValue ? (
        <Fragment>
          <p>{((profit / initValue) * 100).toFixed(2)}%</p>
          {profit >= 0 ? <TbArrowNarrowUp /> : <TbArrowNarrowDown />}
        </Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default Indicator;
