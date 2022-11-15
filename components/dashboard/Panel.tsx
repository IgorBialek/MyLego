import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { TbRefresh } from 'react-icons/tb';
import { useRecoilValue } from 'recoil';

import { itemsAtom } from '../../atoms/dashboard/Items';
import { updatesAtom } from '../../atoms/dashboard/Updates';
import { selectedCurrencyAtom } from '../../atoms/settings/SelectedCurrency';
import { firestore } from '../../firebase';
import Item from '../../models/item/item';
import CardPrimaryButton from '../UI/Card/CardPrimaryButton';
import Chart from '../UI/Chart';
import Indicator from '../UI/Indicator';
import css from './Panel.module.css';

const Panel = () => {
  const { data: session } = useSession();
  const items = useRecoilValue(itemsAtom);
  const updates = useRecoilValue(updatesAtom);
  const selectedCurrency = useRecoilValue(selectedCurrencyAtom);

  const [updating, setUpdating] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0);

  const totalValue = parseInt(
    items
      .reduce(
        (total: number, item: Item) =>
          total + (item.avgPrice ?? 0) * item.count,
        0
      )
      .toFixed()
  );

  const totalValueConverted = parseInt(
    (totalValue * selectedCurrency.value).toFixed()
  );

  const retailValue = parseInt(
    items
      .reduce(
        (total: number, item: Item) => total + (item.retail ?? 0) * item.count,
        0
      )
      .toFixed()
  );

  const retailValueConverted = parseInt(
    (retailValue * selectedCurrency.value).toFixed()
  );

  const updateHandler = async () => {
    if (!updating) {
      setUpdating(true);

      let upgradedItems = await Promise.all(
        items.map(async (item) => {
          let updatedItem = (
            await axios.post("/api/lego/getPriceGuide", {
              type: item.type,
              id: item.id,
              selectedItem: item,
            })
          ).data;

          setUpdateCounter((prevState) => (prevState += 1));

          return updatedItem;
        })
      );

      let upgradedItemsValue = parseInt(
        upgradedItems
          .reduce(
            (total: number, item: Item) =>
              total + (item.avgPrice ?? 0) * item.count,
            0
          )
          .toFixed()
      );

      if (upgradedItemsValue !== updates[updates.length - 1].value) {
        let email = session?.user?.email;

        if (email) {
          await setDoc(doc(firestore, "items", email), {
            items: upgradedItems,
          });

          await setDoc(doc(firestore, "updates", email), {
            updates: [
              ...updates,
              {
                date: new Date().toISOString(),
                value: upgradedItemsValue,
              },
            ],
          });
        }
      }

      setUpdating(false);
      setUpdateCounter(0);
    }
  };

  return (
    <div className={`${css.panelContainer} center`}>
      <div className={`${css.total} center`}>
        <p>
          {totalValueConverted}
          {selectedCurrency.name}
        </p>
        <Indicator
          initValue={retailValueConverted}
          newValue={totalValueConverted}
          customClass={css.indicator}
        />
        <CardPrimaryButton
          text={
            updating ? `${updateCounter}/${items.length} Updated` : "Update"
          }
          icon={<TbRefresh />}
          handler={updateHandler}
          customClass={updating ? css.updateInProgress : css.update}
        />
      </div>
      {updates.length > 1 ? (
        <Chart data={updates} />
      ) : (
        <h2 className={css.chartInfo}>
          You need to at least update your collection twice to see portfolio
          change chart!
        </h2>
      )}
    </div>
  );
};

export default Panel;
