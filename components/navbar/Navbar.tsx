import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { TbLayoutDashboard, TbMenu2, TbPlaylistAdd, TbSettings } from 'react-icons/tb';
import { useMediaQuery } from 'react-responsive';

import css from './Navbar.module.css';

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const [isExpanded, setIsExpanded] = useState(false);

  const router = useRouter();

  class Route {
    href: string;
    name: string;
    icon: ReactElement;

    constructor(href: string, name: string, icon: ReactElement) {
      this.href = href;
      this.name = name;
      this.icon = icon;
    }
  }

  const routes = [
    new Route("/dashboard", "Dashboard", <TbLayoutDashboard />),
    new Route("/addItem", "Add Item", <TbPlaylistAdd />),
    new Route("/settings", "Settings", <TbSettings />),
  ];

  const expandHandler = () => {
    if (isMobile) {
      setIsExpanded((prevState) => !prevState);
    }
  };

  return (
    <div
      id="navbar"
      className={
        isMobile
          ? isExpanded
            ? css.expandedMobileNavbarContainer
            : css.mobileNavbarContainer
          : css.navbarContainer
      }
      onClick={expandHandler}
    >
      {isMobile && !isExpanded && (
        <div>
          <TbMenu2 />
          <div>Menu</div>
        </div>
      )}
      {(!isMobile || (isMobile && isExpanded)) &&
        routes.map((route) => (
          <Link href={route.href} key={route.name}>
            <a
              className={`${css.navbarItem} ${
                route.href === router.pathname && css.selectedNavbarItem
              }`}
            >
              <span>{route.icon}</span>
              {route.name}
            </a>
          </Link>
        ))}
    </div>
  );
};

export default Navbar;
