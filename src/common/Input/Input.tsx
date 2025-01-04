import { FC } from "react";
import classes from "./input.module.scss";

const Input: FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <>
      <input className={classes.input} {...props} />
    </>
  );
};

export { Input };
