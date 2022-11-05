import Head from 'next/head';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRecoilState, useRecoilValue } from 'recoil';

import { loadedItemsAtom } from '../../atoms/addItem/LoadedItems';
import { searchedItemsAtom } from '../../atoms/addItem/SearchedItems';
import { searchedItemsFilterAtom } from '../../atoms/addItem/SearchedItemsFilter';
import { limitAtom } from '../../atoms/layout/limit';
import scrollHandler from '../../lib/scrollHandler';
import Item from '../../models/item/item';
import Loader from '../UI/Loader';
import css from './AddItem.module.css';
import ItemsBar from './ItemsBar';
import SearchedItem from './SearchedItem';

const AddItem = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const [searchedItems, setSearchedItems] = useRecoilState(searchedItemsAtom);
  const searchedItemsFilter = useRecoilValue(searchedItemsFilterAtom);

  const loadedItems = useRecoilValue(loadedItemsAtom);

  const [limit, setLimit] = useRecoilState(limitAtom);

  useEffect(() => {
    return () => {
      setSearchedItems(null);
      setLimit(25);
    };
  }, [setLimit, setSearchedItems]);

  const render = () => {
    if (!loadedItems) {
      return <Loader text="Searching items for you 🔍" />;
    }

    if (!searchedItems) {
      return (
        <h1 className={css.info}>Search for whatever you are looking for 🤗</h1>
      );
    }

    if (searchedItems.length == 0) {
      return <h1 className={css.info}>No results found 😥</h1>;
    }

    if (searchedItems.length > 0) {
      return searchedItems
        .filter((item: Item) => {
          return (
            (item.name
              .toLowerCase()
              .includes(searchedItemsFilter.filter.toLowerCase()) ||
              item.number
                .toLowerCase()
                .includes(searchedItemsFilter.filter.toLowerCase())) &&
            (searchedItemsFilter.type == item.type ||
              searchedItemsFilter.type == "ALL") &&
            item.name != "{?}"
          );
        })
        .slice(0, limit)
        .map((item: Item) => <SearchedItem item={item} key={item.id} />);
    }
  };

  return (
    <div
      className={isMobile ? css.mobileAddItemContainer : css.addItemContainer}
    >
      <Head>
        <title>Add Item</title>
      </Head>

      <ItemsBar />
      <div
        className={isMobile ? css.mobileItemsContainer : css.itemsContainer}
        onScroll={(e) => {
          scrollHandler(e, setLimit);
        }}
      >
        {render()}
      </div>
    </div>
  );
};

export default AddItem;
