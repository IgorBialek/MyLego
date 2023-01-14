import { TbListCheck } from "react-icons/tb";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedItemsAtom } from "../../atoms/addItem/SelectedItems";

import { modalChildAtom } from "../../atoms/layout/ModalChild";
import { showModalAtom } from "../../atoms/layout/ShowModal";
import CardPrimaryButton from "../UI/Card/CardPrimaryButton";
import FilterItems from "./FilterItems";
import GetItems from "./GetItems";
import css from "./ItemsBar.module.css";

const ItemsBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const setModalChild = useSetRecoilState(modalChildAtom);
  const setShowModal = useSetRecoilState(showModalAtom);
  const selectedItems = useRecoilValue(selectedItemsAtom);

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
        text={`Finalize${
          selectedItems.length > 0 ? ` (${selectedItems.length}x 🧱)` : ""
        }`}
        handler={finalizeHandler}
      />

      <FilterItems />
    </div>
  );
};

export default ItemsBar;
