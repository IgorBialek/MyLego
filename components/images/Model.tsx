import { FC } from 'react';
import { TbAlertTriangle } from 'react-icons/tb';

import css from './Model.module.css';

const Model: FC<{ id: string }> = ({ id }) => {
  return (
    <div className={`${css.modelContainer} center`}>
      <h2 className="center">
        <TbAlertTriangle />
        This feature is experimental!
      </h2>

      <iframe src={`http://www.mecabricks.com/en/player/${id}`}></iframe>
    </div>
  );
};

export default Model;
