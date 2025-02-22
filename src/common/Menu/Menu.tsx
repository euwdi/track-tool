import { FC, ReactElement } from "react";
import classes from "./style.module.scss";
import BagIcon from "@/assets/bag.svg?react";
import EmpsIcon from "@/assets/emps.svg?react";
import ToolsIcon from "@/assets/tools.svg?react";
import WarehouseIcon from "@/assets/warehouse.svg?react";
import { useNavigate } from "react-router";
import { Routes } from "@/router/router";

type Tab = {
  logo: ReactElement;
  title: string;
  link: string;
};

const menuTabs: Tab[] = [
  {
    logo: <EmpsIcon />,
    title: "Сотрудники",
    link: "/employees",
  },
  {
    logo: <BagIcon />,
    title: "Мое оборудование",
    link: "/orders",
  },
  {
    logo: <ToolsIcon />,
    title: "Оборудование",
    link: `/tools`,
  },
  {
    logo: <WarehouseIcon />,
    title: "Склады",
    link: "/warehouses",
  },
];

const Menu: FC = () => {
  const navigator = useNavigate();
  return (
    <>
      <div className={classes.container}>
        {menuTabs.map((item) => (
          <button
            className={classes.menuItem}
            onClick={() => navigator(item.link)}
            key={`menu-item-${item.title}`}
          >
            {item.logo} {item.title}
          </button>
        ))}
      </div>
    </>
  );
};

export { Menu };
