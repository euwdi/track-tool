import { FC } from "react";
import classes from "./style.module.scss";

const Loader: FC<{ text?: number }> = ({ text }) => {
  if (text === 2) {
    return <span className={classes.alt}></span>;
  }

  return (
    <div className={!text ? classes.loader : classes.loaderText}>
      <div className={classes.item}></div>
      <div className={classes.item}></div>
      <div className={classes.item}></div>
      <div className={classes.item}></div>
      <div className={classes.item}></div>
      <div className={classes.item}></div>
      <div className={classes.item}></div>
      <div className={classes.item}></div>
    </div>
  );
};

export { Loader };
