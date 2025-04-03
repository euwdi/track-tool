import { FC } from "react";
import classes from "./style.module.scss";

const Loader: FC = () => {
  return <div className={classes.loader}>
    <div className={classes.item}></div>
    <div className={classes.item}></div>
    <div className={classes.item}></div>
    <div className={classes.item}></div>
    <div className={classes.item}></div>
    <div className={classes.item}></div>
    <div className={classes.item}></div>
    <div className={classes.item}></div>
  </div>;
};

export { Loader };
