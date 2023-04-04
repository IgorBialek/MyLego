import { FC, PropsWithChildren, UIEvent, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { limitAtom } from "../../atoms/layout/limit";
import { showModalAtom } from "../../atoms/layout/ShowModal";
import { themeAtom } from "../../atoms/layout/Theme";
import scrollHandler from "../../lib/scrollHandler";
import Navbar from "../navbar/Navbar";
import Modal from "../UI/Modal";
import css from "./Layout.module.css";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const showModal = useRecoilValue(showModalAtom);

  const setLimit = useSetRecoilState(limitAtom);

  const theme = useRecoilValue(themeAtom);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      scrollHandler(
        {
          currentTarget: document.documentElement,
        } as UIEvent<HTMLElement>,
        setLimit
      );
    });
  }, [setLimit]);

  return theme.length > 0 ? (
    <div className={isMobile ? css.mobileLayoutContainer : css.layoutContainer}>
      <Navbar />
      {children}
      {showModal && <Modal />}
    </div>
  ) : (
    <h1 className={`${css.building} center`}>Building...</h1>
  );
};

export default Layout;
