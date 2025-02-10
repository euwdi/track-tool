import { FC } from "react";
import classes from "./style.module.scss";

type Props = {
  onClick: () => void;
  text?: string;
  fullWidth?: boolean;
  disabled?: boolean;
};

const Button: FC<Props> = ({ text, fullWidth, onClick, disabled }) => {
  return (
    <>
      <button
        className={`${classes.button} ${fullWidth ? "full-width" : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
        <div className={classes.ripple}/>
      </button>
    </>
  );
};

export { Button };
