import { FC } from "react";
import classes from "./style.module.scss";
import { ToolStatusEnum, statusMapping } from "@/features/tools/types";

type TProps = {
  status: ToolStatusEnum;
};

const StatusTag: FC<TProps> = ({ status }) => {
  return (
    <span className={`${classes.container} ${classes[status]}`}>
      {statusMapping[status]}
    </span>
  );
};

export { StatusTag };
