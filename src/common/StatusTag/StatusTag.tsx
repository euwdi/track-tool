import { FC } from "react";
import classes from "./style.module.scss";
import { Outlet } from "react-router";
import { STATUSES } from "@/features/tools/types";

type TProps = {
  status: Statuses;
};

const StatusTag: FC<TProps> = ({ status }) => {
  return (
    <>
      <div
        className={`${classes.container} ${
          status === Statuses.AVAILABLE && classes.available
        } ${status === Statuses.BUSY && classes.busy} ${
          status === Statuses.CANCELED && classes.canceled
        }`}
      >
        {status}
      </div>
    </>
  );
};

export { StatusTag };
