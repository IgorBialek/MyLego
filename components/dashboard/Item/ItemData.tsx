import Image from 'next/image';
import { FC, Fragment } from 'react';

import Item from '../../../models/item/item';
import CardInfo from '../../UI/Card/CardInfo';
import css from './ItemData.module.css';

const ItemData: FC<{ item: Item }> = ({ item }) => {
  return (
    <Fragment>
      <div className={`${css.itemImageContainer} center`}>
        <Image
          alt="Upsss"
          src={item.image}
          width={"100%"}
          height={"100%"}
          objectFit={"contain"}
        />
      </div>
      <div className={css.data}>
        <div className={`${css.smallData} center`}>
          <CardInfo text={item.id} customClass={css.smallDesc} />
          <CardInfo text={item.theme} customClass={css.smallDesc} />
        </div>
        <CardInfo text={item.name} customClass={css.itemName} />
      </div>
    </Fragment>
  );
};

export default ItemData;
