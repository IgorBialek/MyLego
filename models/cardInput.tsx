import { FocusEventHandler, KeyboardEventHandler, ReactElement } from 'react';

export default interface cardInput {
  icon?: ReactElement;
  displayIcon: boolean;
  placeholder: string;
  marginTop?: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onInput?: KeyboardEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}
