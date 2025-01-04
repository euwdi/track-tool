import { FC } from "react";
import { LoginForm } from "./components/loginForm/LoginForm";
import classes from "./style.module.scss";
import Logo from "@assets/logo.svg?react";

const LoginPage: FC = () => {
  return (
    <div className={classes.page}>
      <Logo className={classes.logo}/>
      <LoginForm />
    </div>
  );
};

export { LoginPage };
