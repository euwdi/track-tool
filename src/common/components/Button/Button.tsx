import { FC, PropsWithChildren } from "react";
import classes from "./style.module.scss";

type ButtonVariant = "solid" | "outline" | "text";

type Props = {
  onClick: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
};

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  fullWidth,
  onClick,
  disabled,
  variant = "solid",
}) => {
  return (
    <button
      className={`${classes.button} ${classes[variant]} ${
        fullWidth ? classes.fullWidth : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
    >
      {children}
    </button>
  );
};

export { Button };
