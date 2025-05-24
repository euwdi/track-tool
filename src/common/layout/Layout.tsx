import { FC, useEffect, useRef, useState } from "react";
import classes from "./style.module.scss";
import { Outlet } from "react-router";
import Logo from "@/assets/logo.svg?react";
import BurgerMenu from "@/assets/burgerMenu.svg?react";
import { Menu } from "@/common/components/Menu/Menu";
import UserProfileDropdown from "@/features/users/userProfileDropdown/UserProfileDropdown";

const Layout: FC<React.InputHTMLAttributes<HTMLInputElement>> = () => {
  const [openedMenu, setOpenedMenu] = useState<boolean>(false);

  const moobileMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      moobileMenuRef.current &&
      !moobileMenuRef.current.contains(event.target as Node)
    ) {
      setOpenedMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className={classes.header}>
        <BurgerMenu
          className={classes.burger}
          onClick={() => setOpenedMenu(!openedMenu)}
        />
        <Logo className={classes.logo} />

        <div className={classes.actionsContainer}>
          <div className={classes.baseMenu}>
            <Menu />
          </div>
          {openedMenu && (
            <div className={classes.mobileMenu} ref={moobileMenuRef}>
              <Menu />
            </div>
          )}

          {/* <ProfileIcon className={classes.actionIcon} /> */}
          <UserProfileDropdown />
          {/* <button
            className={classes.logoutButton}
            onClick={() => {
              navigator(`/${Routes.LOGIN}`);
              logout();
            }}
          >
            Выход
          </button> */}
        </div>
      </header>
      <div className={classes.pageContainer}>
        <Outlet />
      </div>
    </>
  );
};

export { Layout };
