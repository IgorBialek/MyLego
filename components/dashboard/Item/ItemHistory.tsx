import { FC, Fragment } from 'react';
import { useRecoilValue } from 'recoil';

import { selectedCurrencyAtom } from '../../../atoms/settings/SelectedCurrency';
import Item from '../../../models/item/item';
import CardInfo from '../../UI/Card/CardInfo';
import Chart from '../../UI/Chart';
import Indicator from '../../UI/Indicator';
import css from './ItemHistory.module.css';

const ItemHistory: FC<{ item: Item }> = ({ item }) => {
  const selectedCurrency = useRecoilValue(selectedCurrencyAtom);

  return (
    <Fragment>
      <div className={"center"}>
        <CardInfo
          text={
            (
              (item.avgPrice ?? 0) *
              item.count *
              selectedCurrency.value
            ).toFixed() + selectedCurrency.name
          }
          customClass={css.itemPrice}
        />
        <Indicator initValue={item.retail ?? 0} newValue={item.avgPrice ?? 0} />
        {item.count > 1 && (
          <CardInfo
            text={`(${(
              (item.avgPrice ?? 0) * selectedCurrency.value
            ).toFixed()}${selectedCurrency.name} x ${item.count})`}
            customClass={css.itemCount}
          />
        )}
      </div>
      <Chart data={item.history ?? []} />
    </Fragment>
  );
};

export default ItemHistory;
