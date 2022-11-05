import axios from 'axios';
import { KeyboardEvent, useRef } from 'react';
import { TbSearch } from 'react-icons/tb';
import { useSetRecoilState } from 'recoil';

import { loadedItemsAtom } from '../../atoms/addItem/LoadedItems';
import { searchedItemsAtom } from '../../atoms/addItem/SearchedItems';
import { modalChildAtom } from '../../atoms/layout/ModalChild';
import { showModalAtom } from '../../atoms/layout/ShowModal';
import CardInput from '../UI/Card/CardInput';
import CardPrimaryButton from '../UI/Card/CardPrimaryButton';
import css from './GetItems.module.css';

const GetItems = () => {
  const queryRef = useRef<HTMLInputElement>(null);

  const SetSearchedItems = useSetRecoilState(searchedItemsAtom);
  const setLoaded = useSetRecoilState(loadedItemsAtom);

  const setShowModal = useSetRecoilState(showModalAtom);
  const setModalChild = useSetRecoilState(modalChildAtom);

  const getSearchedItems = async () => {
    SetSearchedItems(null);
    setLoaded(false);

    if (queryRef!.current!.value == "") {
      SetSearchedItems([]);
      setLoaded(true);
      return;
    }

    let response = (
      await axios.post("/api/lego/getSearchedItems", {
        query: queryRef!.current!.value,
      })
    ).data;

    console.log(response);

    if (response.error) {
      setModalChild({
        id: "ERROR",
        title: response.errorMessage.title,
        text: response.errorMessage.text,
        handler: () => setShowModal(false),
      });

      setShowModal(true);

      return;
    }

    SetSearchedItems(response.items);
    queryRef!.current!.value = "";

    setLoaded(true);
  };

  return (
    <div className={css.getItemsContainer}>
      <CardInput
        icon={<TbSearch />}
        placeholder="Items Query"
        displayIcon={true}
        ref={queryRef}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key == "Enter") {
            getSearchedItems();
          }
        }}
      />
      <CardPrimaryButton text="Get" handler={getSearchedItems} />
    </div>
  );
};

export default GetItems;
