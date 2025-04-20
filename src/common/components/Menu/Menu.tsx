import { FC, ReactElement } from "react";
import classes from "./style.module.scss";

import { useNavigate } from "react-router";
import { Routes } from "@/router/router";
import { useUserStore } from "@/stores/userStore";
import { useMenuItems } from "./hooks";

type Tab = {
  title: string;
  link: string;
  icon: ReactElement;
};

// [
//   {
//     logo: <EmpsIcon />,
//     title: "Сотрудники",
//     link: "/users",
//   },
//   {
//     logo: <BagIcon />,
//     title: "Мое оборудование",
//     link: "/tools/me",
//   },
//   {
//     logo: <ToolsIcon />,
//     title: "Оборудование",
//     link: `/tools`,
//   },
//   {
//     logo: <WarehouseIcon />,
//     title: "Склады",
//     link: "/storages",
//   },
// ];

const Menu: FC = () => {
  const navigator = useNavigate();
  const { logout } = useUserStore();

  const menuTabs: Tab[] = useMenuItems();
  
  return (
    <>
      <div className={classes.container}>
        {menuTabs.map((item) => (
          <button
            className={classes.menuItem}
            onClick={() => navigator(item.link)}
            key={`menu-item-${item.title}`}
          >
            {item.icon} {item.title}
          </button>
        ))}
        <button
          className={classes.menuItem}
          onClick={() => {
            navigator(`/${Routes.LOGIN}`);
            logout();
          }}
        >
          Выход
        </button>
      </div>
    </>
  );
};

export { Menu };
