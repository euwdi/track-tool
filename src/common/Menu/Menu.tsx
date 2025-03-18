import { FC, ReactElement } from "react";
import classes from "./style.module.scss";
import BagIcon from "@/assets/bag.svg?react";
import EmpsIcon from "@/assets/emps.svg?react";
import ToolsIcon from "@/assets/tools.svg?react";
import WarehouseIcon from "@/assets/warehouse.svg?react";
import { useNavigate } from "react-router";
import { Routes } from "@/router/router";
import { useUserStore } from "@/stores/userStore";

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
    link: "/tools/me",
  },
  {
    logo: <ToolsIcon />,
    title: "Оборудование",
    link: `/tools`,
  },
  {
    logo: <WarehouseIcon />,
    title: "Склады",
    link: "/storages",
  },
];

const Menu: FC = () => {
  const navigator = useNavigate();
  const { logout } = useUserStore();
  
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
        <button className={classes.menuItem} onClick={logout}>
          Выход
        </button>
      </div>
    </>
  );
};

export { Menu };
