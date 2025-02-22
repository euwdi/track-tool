import { FC } from "react";
import { LoginForm } from "./components/loginForm/LoginForm";
import classes from "./style.module.scss";

const LoginPage: FC = () => {
  return (
    <div className={classes.page}>
      <LoginForm />
    </div>
  );
};

export { LoginPage };
