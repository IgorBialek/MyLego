import { FC, KeyboardEvent, ReactElement, useState } from 'react';

import css from './CardDropdown.module.css';
import CardInput from './CardInput';

const CardDropdown: FC<{
  values: string[];
  chooseHandler: (val: string) => void;
  customClass?: string;
  customItemsClass?: string;
  icon: ReactElement;
}> = ({ values, chooseHandler, customClass, customItemsClass, icon }) => {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");

  const clickHandler = (val: string) => {
    chooseHandler(val);
    setFocused(false);
  };

  const queryHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <div className={customClass}>
      <CardInput
        displayIcon={true}
        icon={icon}
        placeholder={"Search currency"}
        onInput={queryHandler}
        onFocus={() => setFocused(true)}
      />
      {focused && (
        <div className={`${css.dropdownItemContainer} ${customItemsClass}`}>
          {values
            .filter((v) =>
              v.toLocaleLowerCase().includes(query.toLocaleLowerCase())
            )
            .map((v) => (
              <div
                key={v}
                className={css.dropdownItem}
                onClick={() => clickHandler(v)}
              >
                {v}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CardDropdown;
