import { FC } from "react";
import classes from "./style.module.scss";
import { Outlet } from "react-router";
import Logo from "@/assets/logoInvert.svg?react";
import BurgerMenu from "@/assets/burgerMenu.svg?react";
import ProfileIcon from "@/assets/profile.svg?react";
import NotificationsIcon from "@/assets/notification.svg?react";

const Layout: FC<React.InputHTMLAttributes<HTMLInputElement>> = () => {
  return (
    <>
      <header className={classes.header}>
        <BurgerMenu className={classes.burger} />
        <Logo className={classes.logo} />
        <div className={classes.actionsContainer}>
          <ProfileIcon className={classes.actionIcon} />
          <NotificationsIcon className={classes.actionIcon} />
        </div>
      </header>
      <Outlet />
    </>
  );
};

export { Layout };
