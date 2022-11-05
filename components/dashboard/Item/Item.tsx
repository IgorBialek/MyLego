import { useRouter } from 'next/router';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { currentItemAtom } from '../../../atoms/images/currentItem';
import Item from '../../../models/item/item';
import Card from '../../UI/Card/Card';
import css from './Item.module.css';
import ItemActions from './ItemActions';
import ItemData from './ItemData';
import ItemHistory from './ItemHistory';

const ItemComp: FC<{ item: Item }> = ({ item }) => {
  const router = useRouter();
  const setCurrentItem = useSetRecoilState(currentItemAtom);

  const [showAdvData, setShowAdvData] = useState(false);
  const [showActions, setShowActions] = useState(false);
  let pressTimeout: ReturnType<typeof setTimeout> | null = null;

  const mouseDownHandler = (e: MouseEvent<HTMLElement>) => {
    if (e.button == 0) {
      pressTimeout = setTimeout(() => {
        setShowActions(true);
      }, 1000);
    }
  };

  const mouseUpHandler = (e: MouseEvent<HTMLElement>) => {
    if (e.button == 0) {
      if (pressTimeout) {
        clearTimeout(pressTimeout);
      }

      if (!showActions) {
        setShowAdvData((prevState) => !prevState);
      }
    }
  };

  const contextMenuHandler = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setCurrentItem({ id: item.id, setID: item.setID, image: item.image });
    router.push(`/images`);
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
        <ItemData item={item} />
      )}
    </Card>
  );
};

export default ItemComp;
