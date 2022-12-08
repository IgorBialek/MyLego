import { useRouter } from 'next/router';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { TbAdjustments, TbChartArea, TbPhoto } from 'react-icons/tb';

import Item from '../../../models/item/item';
import Card from '../../UI/Card/Card';
import CardSmallButton from '../../UI/Card/CardSmallButton';
import css from './Item.module.css';
import ItemActions from './ItemActions';
import ItemData from './ItemData';
import ItemHistory from './ItemHistory';

const ItemComp: FC<{ item: Item }> = ({ item }) => {
  const router = useRouter();

  const [showAdvData, setShowAdvData] = useState(false);
  const [showActions, setShowActions] = useState(false);
  let pressTimeout: ReturnType<typeof setTimeout> | null = null;

  const mouseDownHandler = (e: MouseEvent<HTMLElement>) => {
    if (e.button == 0) {
      pressTimeout = setTimeout(() => {
        showActionsHandler();
      }, 1000);
    }
  };

  const mouseUpHandler = (e: MouseEvent<HTMLElement>) => {
    if (e.button == 0) {
      if (pressTimeout) {
        clearTimeout(pressTimeout);
      }

      if (!showActions) {
        showHistoryHandler();
      }
    }
  };

  const showActionsHandler = () => {
    setShowActions(true);
  };

  const showHistoryHandler = () => {
    setShowAdvData((prevState) => !prevState);
  };

  const showImagesHandler = () => {
    router.push({
      pathname: "/images",
      query: { id: item.id, setID: item.setID, image: item.image },
    });
  };

  const contextMenuHandler = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    showImagesHandler();
  };

  useEffect(() => {
    return () => {
      if (pressTimeout) {
        clearTimeout(pressTimeout);
      }
    };
  }, [pressTimeout]);

  return (
    <Card
      customClass={css.itemContainer}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onContextMenu={contextMenuHandler}
    >
      {showActions ? (
        <ItemActions item={item} setShowActions={setShowActions} />
      ) : showAdvData ? (
        <ItemHistory item={item} />
      ) : (
        <>
          <ItemData item={item} />
          <div className={css.smallButtonsContainer}>
            <CardSmallButton
              icon={<TbChartArea />}
              handler={showHistoryHandler}
            />
            <CardSmallButton
              icon={<TbAdjustments />}
              handler={showActionsHandler}
            />
            <CardSmallButton icon={<TbPhoto />} handler={showImagesHandler} />
          </div>
        </>
      )}
    </Card>
  );
};

export default ItemComp;
