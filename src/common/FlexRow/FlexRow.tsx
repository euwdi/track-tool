import { FC, PropsWithChildren } from "react";
import classes from "./style.module.scss";

type Props = {
  horizontalCenter?: boolean;
};

const FlexRow: FC<PropsWithChildren<Props>> = ({
  children,
  horizontalCenter,
}) => {
  return (
    <div className={`${classes.row} ${horizontalCenter ? classes.center : ""}`}>
      {children}
    </div>
  );
};

export { FlexRow };
