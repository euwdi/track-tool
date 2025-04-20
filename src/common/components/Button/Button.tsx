import { FC, PropsWithChildren } from "react";
import classes from "./style.module.scss";

type Props = {
  onClick: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
};

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  fullWidth,
  onClick,
  disabled,
}) => {
  return (
    <>
      <button
        className={`${classes.button} ${fullWidth ? "full-width" : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
        <div className={classes.ripple} />
      </button>
    </>
  );
};

export { Button };
