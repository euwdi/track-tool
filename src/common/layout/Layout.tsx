import { FC } from "react";
import classes from "./style.module.scss";
import { Outlet, useNavigate } from "react-router";
import Logo from "@/assets/logo.svg?react";
import BurgerMenu from "@/assets/burgerMenu.svg?react";
import ProfileIcon from "@/assets/profile.svg?react";
import { Routes } from "@/router/router";
import { useUserStore } from "@/stores/userStore";
import { Menu } from "@/common/components/Menu/Menu";

const Layout: FC<React.InputHTMLAttributes<HTMLInputElement>> = () => {
  const navigator = useNavigate();
  const { logout } = useUserStore();

  return (
    <>
      <header className={classes.header}>
        <BurgerMenu className={classes.burger} />
        <Logo className={classes.logo} />

        <div className={classes.actionsContainer}>
          <Menu />
          <ProfileIcon className={classes.actionIcon} />
          <button
            className={classes.logoutButton}
            onClick={() => {
              navigator(`/${Routes.LOGIN}`);
              logout();
            }}
          >
            Выход
          </button>
        </div>
      </header>
      <div className={classes.pageContainer}>
        <Outlet />
      </div>
    </>
  );
};

export { Layout };
