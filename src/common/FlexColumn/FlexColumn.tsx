import { FC, PropsWithChildren } from "react";
import classes from "./style.module.scss";

const FlexColumn: FC<PropsWithChildren<{ verticalCenter?: boolean }>> = ({
  children,
  verticalCenter,
}) => {
  return (
    <div className={`${classes.column} ${verticalCenter ? classes.center : ""}`}>
      {children}
    </div>
  );
};

export { FlexColumn };
