import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { sortedItemsSelector } from "../../../atoms/dashboard/SortedItems";
import { limitAtom } from "../../../atoms/layout/limit";
import scrollHandler from "../../../lib/scrollHandler";
import ItemComp from "./Item";
import css from "./ItemList.module.css";

const ItemList = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const sortedItems = useRecoilValue(sortedItemsSelector);

  const setLimit = useSetRecoilState(limitAtom);

  useEffect(() => {
    return () => {
      setLimit(25);
    };
  }, [setLimit]);

  return (
    <div
      className={
        isMobile ? css.mobileDashboardContainer : css.dashboardContainer
      }
      onScroll={(e) => {
        scrollHandler(e, setLimit);
      }}
    >
      {sortedItems.length > 0 ? (
        sortedItems.map((item) => <ItemComp key={item.id} item={item} />)
      ) : (
        <div className={`${css.itemListInfo} center`}>
          <h1>It is empty here! 😨</h1>
          <h2>Please add some items 🥺</h2>
        </div>
      )}
    </div>
  );
};

export default ItemList;
