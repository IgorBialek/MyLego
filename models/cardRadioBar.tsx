import { ReactElement } from 'react';

export default interface CardRadioBar<T> {
  values: T[];
  names: string[];
  icons?: ReactElement[];
  selectedValue: T;
  changeHandler: (value: T) => void;
}
