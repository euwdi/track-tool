import { FC } from "react";
import classes from "./style.module.scss";

type Props = {
  onClick: () => void;
  text?: string;
  fullWidth?: boolean;
};

const Button: FC<Props> = ({ text, fullWidth, onClick }) => {
  return (
    <>
      <button
        className={`${classes.button} ${fullWidth ? "full-width" : ""}`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export { Button };
