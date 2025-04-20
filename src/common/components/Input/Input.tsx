import { FC } from "react";
import classes from "./input.module.scss";

type TProps = {
  inputType: "outline" | "contain";
};

const Input: FC<TProps & React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <>
      <input
        className={`${classes.input} ${classes[props.inputType]}`}
        {...props}
      />
    </>
  );
};

export { Input };
