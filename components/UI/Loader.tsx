import { FC, useEffect, useState } from 'react';

import stage0 from '../../public/loader/0';
import stage1 from '../../public/loader/1';
import stage2 from '../../public/loader/2';
import stage3 from '../../public/loader/3';
import stage4 from '../../public/loader/4';
import css from './Loader.module.css';

const Loader: FC<{ text: string }> = ({ text }) => {
  const [current, setCurrent] = useState(stage0);

  useEffect(() => {
    let index = 0;
    let interval = setInterval(() => {
      switch (index) {
        case 0:
          setCurrent(stage0);
          break;
        case 1:
          setCurrent(stage1);
          break;
        case 2:
          setCurrent(stage2);
          break;
        case 3:
          setCurrent(stage3);
          break;
        case 4:
          setCurrent(stage4);
          break;
      }
      if (index == 4) {
        index = 0;
      } else {
        index++;
      }
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`${css.loaderContainer} center`}>
      <h1>{text}</h1>
      <div>{current}</div>
    </div>
  );
};

export default Loader;
