import { FC, ReactElement } from 'react';

import css from './CardCheckbox.module.css';

const CardCheckbox: FC<{
  handler: () => void;
  selected: boolean;
  selectedContent: ReactElement;
  unselectedContent: ReactElement;
  customClass?: string;
}> = ({
  handler,
  selected,
  selectedContent,
  unselectedContent,
  customClass,
}) => {
  return (
    <div className={`${css.cardCheckboxContainer} center ${customClass}`}>
      <div
        className={selected ? css.selected : css.unselected}
        onClick={handler}
      >
        {selected ? unselectedContent : selectedContent}
      </div>
    </div>
  );
};

export default CardCheckbox;
