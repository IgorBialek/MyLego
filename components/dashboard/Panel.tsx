import axios from "axios";
import { doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { TbChartPie, TbFilter, TbRefresh } from "react-icons/tb";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { itemsAtom } from "../../atoms/dashboard/Items";
import { updatesAtom } from "../../atoms/dashboard/Updates";
import { modalChildAtom } from "../../atoms/layout/ModalChild";
import { showModalAtom } from "../../atoms/layout/ShowModal";
import { selectedCurrencyAtom } from "../../atoms/settings/SelectedCurrency";
import { firestore } from "../../firebase";
import Item from "../../models/item/item";
import CardPrimaryButton from "../UI/Card/CardPrimaryButton";
import Chart from "../UI/Chart";
import Indicator from "../UI/Indicator";
import Usage from "../UI/Usage";
import css from "./Panel.module.css";

const Panel = () => {
  const { data: session } = useSession();
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const hideSieve = useMediaQuery({ maxWidth: 1840 });
  const hidePiePanel = useMediaQuery({ maxWidth: 1385 });

  const items = useRecoilValue(itemsAtom);
  const updates = useRecoilValue(updatesAtom);
  const selectedCurrency = useRecoilValue(selectedCurrencyAtom);
  const setShowModal = useSetRecoilState(showModalAtom);
  const setModalChild = useSetRecoilState(modalChildAtom);

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

      let upgradedItems = [];

      try {
        upgradedItems = await Promise.all(
          items.map(async (item) => {
            let updatedItem = (
              await axios.post("/api/lego/getPriceGuide", {
                type: item.type,
                id: item.id,
                selectedItem: item,
              })
            ).data;

            await updateDoc(doc(firestore, "app", "usage"), {
              bricklink: increment(-1),
            });

            setUpdateCounter((prevState) => (prevState += 1));

            return updatedItem;
          })
        );
      } catch {
        setModalChild({
          id: "ERROR",
          title: "Ooops!",
          text: "Something went wrong 😵.",
          handler: () => {
            setUpdating(false);
            setUpdateCounter(0);
            setShowModal(false);
          },
        });
        setShowModal(true);
        return;
      }

      let upgradedItemsValue = parseInt(
        upgradedItems
          .reduce(
            (total: number, item: Item) =>
              total + (item.avgPrice ?? 0) * item.count,
            0
          )
          .toFixed()
      );

      if (
        updates.length === 0 ||
        upgradedItemsValue !== updates[updates.length - 1].value
      ) {
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

  const showSieveHandler = () => {
    setModalChild({ id: "SIEVE" });
    setShowModal(true);
  };

  const showPieChartHandler = () => {
    setModalChild({ id: "PIE" });
    setShowModal(true);
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
        <div className={css.updateContainer}>
          <CardPrimaryButton
            text={
              updating ? `${updateCounter}/${items.length} Updated` : "Update"
            }
            icon={<TbRefresh />}
            handler={updateHandler}
            customClass={updating ? css.updateInProgress : css.update}
          />
          <Usage customClass={css.usage} property={"bricklink"} />
        </div>
        <div className={css.hiddenContainer}>
          {!isMobile && hideSieve && (
            <div className={css.hiddenSieveContainer}>
              <CardPrimaryButton
                customClass={css.showSieveButton}
                icon={<TbFilter />}
                handler={showSieveHandler}
              />
            </div>
          )}
          {!isMobile && hidePiePanel && (
            <div className={css.hiddenPieChartContainer}>
              <CardPrimaryButton
                customClass={css.showPieChartButton}
                icon={<TbChartPie />}
                handler={showPieChartHandler}
              />
            </div>
          )}
        </div>
      </div>

      {updates.length > 1 ? (
        <Chart data={updates} />
      ) : (
        <h2 className={css.chartInfo}>
          You need to at least update your collection twice to see portfolio
          change chart! 📈
        </h2>
      )}
    </div>
  );
};

export default Panel;
