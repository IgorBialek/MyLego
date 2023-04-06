import { FC, Fragment } from "react";
import { useRecoilValue } from "recoil";

import { selectedCurrencyAtom } from "../../../atoms/settings/SelectedCurrency";
import Item from "../../../models/item/item";
import CardInfo from "../../UI/Card/CardInfo";
import Chart from "../../UI/Chart";
import Indicator from "../../UI/Indicator";
import css from "./ItemHistory.module.css";

const ItemHistory: FC<{ item: Item }> = ({ item }) => {
  const selectedCurrency = useRecoilValue(selectedCurrencyAtom);

  let sortedHistory = [...(item.history ?? [])].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let latestValue = sortedHistory
    ? sortedHistory[sortedHistory.length - 1].value
    : 0;
  let secondLatesValue = sortedHistory
    ? sortedHistory[sortedHistory.length - 2].value
    : 0;

  let lastPriceChangeValue = Math.ceil(
    (latestValue - secondLatesValue) * selectedCurrency.value
  );

  return (
    <Fragment>
      <div className={`${css.container} center`}>
        <CardInfo text={"Avarage Price"} customClass={css.smallDesc} />
        <div className={`${css.price} center`}>
          <CardInfo
            text={
              Math.ceil((item.avgPrice ?? 0) * selectedCurrency.value) +
              selectedCurrency.name
            }
            customClass={css.itemPrice}
          />
          <Indicator
            initValue={item.retail ?? 0}
            newValue={item.avgPrice ?? 0}
            selectedCurrency={selectedCurrency}
          />
        </div>
        <CardInfo text={"Latest Change"} customClass={css.smallDesc} />
        <div className={`${css.change} center`}>
          <CardInfo
            text={
              (lastPriceChangeValue >= 0 ? "+" : "-") +
              Math.abs(lastPriceChangeValue) +
              selectedCurrency.name
            }
            customClass={css.smallItemPrice}
          />
          <Indicator
            initValue={secondLatesValue}
            newValue={latestValue}
            selectedCurrency={selectedCurrency}
            customClass={css.smallIndicator}
          />
        </div>
        {item.count > 1 && (
          <CardInfo
            text={`(${(
              (item.avgPrice ?? 0) * selectedCurrency.value
            ).toFixed()}${selectedCurrency.name} x ${item.count})`}
            customClass={css.smallDesc}
          />
        )}
      </div>
      <Chart data={item.history ?? []} />
    </Fragment>
  );
};

export default ItemHistory;
