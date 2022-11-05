import { UIEvent } from 'react';
import { SetterOrUpdater } from 'recoil';

const scrollHandler = (
  event: UIEvent<HTMLElement>,
  setState: SetterOrUpdater<number>
) => {
  const bottom =
    event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
    event.currentTarget.clientHeight;

  if (bottom) {
    setState((prevState) => prevState + 25);
  }
};

export default scrollHandler;
