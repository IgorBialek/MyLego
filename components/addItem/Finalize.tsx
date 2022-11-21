import axios from 'axios';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { selectedItemsAtom } from '../../atoms/addItem/SelectedItems';
import { itemsAtom } from '../../atoms/dashboard/Items';
import { modalChildAtom } from '../../atoms/layout/ModalChild';
import { showModalAtom } from '../../atoms/layout/ShowModal';
import { firestore } from '../../firebase';
import syncItems from '../../lib/syncItems';
import Item from '../../models/item/item';
import CardPrimaryButton from '../UI/Card/CardPrimaryButton';
import CardSecondaryButton from '../UI/Card/CardSecondaryButton';
import css from './Finalize.module.css';
import FinalizeItem from './FinalizeItem';

const Finalize = () => {
  const { data: session } = useSession();

  const setShowModal = useSetRecoilState(showModalAtom);
  const items = useRecoilValue(itemsAtom);

  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsAtom);

  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const [loading, setLoading] = useState(false);

  const setModalChild = useSetRecoilState(modalChildAtom);

  const addHandler = async () => {
    if (!loading) {
      setLoading(true);

      let upgradedItems: Item[] = [];
      try {
        upgradedItems = await Promise.all(
          selectedItems.map(async (item) => {
            let res = await axios.post("/api/lego/getPriceGuide", {
              type: item.type,
              id: item.id,
              selectedItem: item,
            });

            await updateDoc(doc(firestore, "app", "usage"), {
              bricklink: increment(-1),
            });

            return res.data;
          })
        );
        let newItems: Item[] = [];

        //Merge items
        items.forEach((item) => {
          let count = item.count;

          upgradedItems.forEach((upgradedItem: Item) => {
            if (item.id == upgradedItem.id) {
              count = item.count + upgradedItem.count;

              upgradedItems = upgradedItems.filter(
                (i: Item) => i.id != upgradedItem.id
              );
            }
          });

          newItems.push({ ...item, count });
        });

        let email = session?.user?.email;

        await syncItems([...newItems, ...upgradedItems], email);

        setLoading(false);
        setShowModal(false);
        setSelectedItems([]);
      } catch (e) {
        if (axios.isAxiosError(e) && typeof e.response?.data == "string") {
          setModalChild({
            id: "ERROR",
            title: "Ooops!",
            text: e.response?.data,
            handler: () => setShowModal(false),
          });
        } else {
          setModalChild({
            id: "ERROR",
            title: "Ooops!",
            text: "Something went wrong 😵.",
            handler: () => {
              setShowModal(false);
            },
          });
        }
      }
    }
  };

  return (
    <div
      className={isMobile ? css.mobileFinalizeContainer : css.finalizeContainer}
    >
      <h1>Summary</h1>

      <div
        className={
          isMobile
            ? css.mobileFinalizeItemsContainer
            : css.finalizeItemsContainer
        }
      >
        {selectedItems.length > 0 ? (
          selectedItems.map((item) => (
            <FinalizeItem
              key={`${item.id}`}
              item={item}
              repeated={items.some((i) => i.id == item.id)}
            />
          ))
        ) : (
          <h2>Nothing here yet! 🙄</h2>
        )}
      </div>

      <div className={css.controls}>
        <CardSecondaryButton
          text="Cancel"
          handler={() => setShowModal(false)}
        />
        {selectedItems.length > 0 && (
          <CardPrimaryButton
            text={loading ? "Adding..." : "Add"}
            handler={addHandler}
          />
        )}
      </div>
    </div>
  );
};

export default Finalize;
