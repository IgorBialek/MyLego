import { FC, Fragment } from 'react';
import { TbArrowNarrowDown, TbArrowNarrowUp } from 'react-icons/tb';

import css from './Indicator.module.css';

const Indicator: FC<{
  initValue: number;
  newValue: number;
  customClass?: string;
  selectedCurrency?: { name: string; value: number };
}> = ({ initValue, newValue, customClass, selectedCurrency }) => {
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
      ) : selectedCurrency ? (
        <p>
          +{(newValue * selectedCurrency.value).toFixed()}
          {selectedCurrency.name}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Indicator;
