import { FC } from "react";
import classes from "./style.module.scss";
import { Outlet } from "react-router";

const Layout: FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <>
      <header>
        
      </header>
      <Outlet />
    </>
  );
};

export { Layout };
