import { FC } from "react";
import classes from "./style.module.scss";
import { ToolStatus, statusMapping } from "@/features/tools/types";

type TProps = {
  status: ToolStatus;
};

const StatusTag: FC<TProps> = ({ status }) => {
  return (
    <span className={`${classes.container} ${classes[status]}`}>
      {statusMapping[status]}
    </span>
  );
};

export { StatusTag };
