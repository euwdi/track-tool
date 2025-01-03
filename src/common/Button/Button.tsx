import { FC } from "react";
import classes from "./style.module.scss";

const Button: FC = () => {
  return (
    <>
      <button className={classes.same} />
    </>
  );
};

export { Button };
