import { FC, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@common/Button/Button";
import { Input } from "@common/Input/Input";
import { NavLink } from "react-router";


const LoginForm: FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmitClick = () => {
    // Submit form logic here
    console.log("submit");
  };

  return (
    <div
      className={classes.container}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onSubmitClick();
        }
      }}
    >
      <h1 className={classes.title}>Вход</h1>

      <div className={classes["fields-box"]}>
        <Input
          placeholder="Логин"
          autoFocus
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <Input
          placeholder="Пароль"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <Button text="Войти" fullWidth onClick={onSubmitClick} />

      <div className={classes.row}>
        <NavLink to={""} className={classes.link}>
          Восстановить пароль
        </NavLink>
        <NavLink to={"/register"} className={classes.link}>
          Зарегистрироваться
        </NavLink>
      </div>
    </div>
  );
};

export { LoginForm };
