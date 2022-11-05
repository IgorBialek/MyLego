import { TbListCheck } from 'react-icons/tb';
import { useMediaQuery } from 'react-responsive';
import { useSetRecoilState } from 'recoil';

import { modalChildAtom } from '../../atoms/layout/ModalChild';
import { showModalAtom } from '../../atoms/layout/ShowModal';
import CardPrimaryButton from '../UI/Card/CardPrimaryButton';
import FilterItems from './FilterItems';
import GetItems from './GetItems';
import css from './ItemsBar.module.css';

const ItemsBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const setModalChild = useSetRecoilState(modalChildAtom);
  const setShowModal = useSetRecoilState(showModalAtom);

  const finalizeHandler = () => {
    setModalChild({ id: "FINALIZE" });
    setShowModal(true);
  };

  return (
    <div
      className={`${css.itemsBarContainer} ${
        isMobile ? css.mobileItemsBarContainer : ""
      }`}
    >
      <GetItems />
      <CardPrimaryButton
        marginTop={true}
        icon={<TbListCheck />}
        text={"Finalize"}
        handler={finalizeHandler}
      />
      <FilterItems />
    </div>
  );
};

export default ItemsBar;
