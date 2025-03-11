import { FC, useEffect, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/Button/Button";
import { Input } from "@/common/Input/Input";
import { NavLink, useNavigate } from "react-router";
import Logo from "@/assets/logo.svg?react";
import { Routes } from "@/router/router";
import { useUserStore } from "@/stores/userStore";

const LoginForm: FC = () => {
  const navigator = useNavigate();
  const isAuth = useUserStore((state) => state.isAuth);
  const { login: fetchLogin } = useUserStore((state) => state);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmitClick = () => {
    if (login.trim() && password.trim()) {
      console.log("submit");
      fetchLogin(login, password);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigator(`/${Routes.TOOLS}`);
    }
  }, [isAuth, navigator]);

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
          inputType="outline"
        />
        <Input
          placeholder="Пароль"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          inputType="outline"
        />
      </div>

      <Button
        text="Войти"
        fullWidth
        onClick={onSubmitClick}
        disabled={!login || !password}
      />

      <div className={classes.row}>
        <NavLink to={""} className={classes.link}>
          Восстановить пароль
        </NavLink>
        <NavLink to={"/register"} className={classes.link}>
          Зарегистрироваться
        </NavLink>
      </div>

      <Logo className={classes.logo} />
    </div>
  );
};

export { LoginForm };
