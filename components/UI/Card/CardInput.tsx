import { forwardRef } from 'react';

import cardInput from '../../../models/cardInput';
import css from './CardInput.module.css';

const CardInput = forwardRef<HTMLInputElement, cardInput>(
  (
    {
      icon,
      displayIcon,
      placeholder,
      marginTop,
      onKeyDown,
      onInput,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    return (
      <div className={`${css.cardInputContainer} ${marginTop && "marginTop"}`}>
        {displayIcon && <span>{icon}</span>}
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={css.cardInput}
          onKeyDown={onKeyDown}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    );
  }
);

CardInput.displayName = "CardInput";

export default CardInput;
