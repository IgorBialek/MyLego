import { FC } from 'react';

import css from './CardCarousel.module.css';
import CardPrimaryButton from './CardPrimaryButton';
import CardSecondaryButton from './CardSecondaryButton';

const CardCarousel: FC<{
  length: number;
  incrementStage: () => void;
  decrementStage: () => void;
  stage: number;
}> = ({ length, incrementStage, decrementStage, stage }) => {
  return (
    <div className={`${css.controlContainer} center`}>
      <div className={`${css.stageContainer} center`}>
        <div
          className={css.stageIndicator}
          style={{ left: (240 / (length - 1)) * stage + "px" }}
        ></div>
      </div>
      <div className={`${css.actionContainer} center`}>
        <CardSecondaryButton text="Back" handler={decrementStage} />
        <CardPrimaryButton text="Next" handler={incrementStage} />
      </div>
    </div>
  );
};

export default CardCarousel;
