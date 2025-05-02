import { useUserStore } from "@/stores/userStore";
import { useMemo } from "react";
import BagIcon from "@/assets/bag.svg?react";
import EmpsIcon from "@/assets/emps.svg?react";
import ToolsIcon from "@/assets/tools.svg?react";
import WarehouseIcon from "@/assets/warehouse.svg?react";
import { Roles } from "@/types/roles.types";
import { useLocation } from "react-router";

export const useMenuItems = () => {
  const { profile } = useUserStore();

  const menu = useMemo(() => {
    const _menu: {
      title: string;
      link: string;
      icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    }[] = [
      {
        icon: BagIcon,
        title: "Мое оборудование",
        link: "/tools/me",
      },
    ];

    if (profile.roleId === Roles.EMP) return _menu;

    _menu.push({
      icon: ToolsIcon,
      title: "Оборудование",
      link: "/tools",
    });

    if (profile.roleId === Roles.USER) return _menu;

    _menu.push({
      icon: EmpsIcon,
      title: "Сотрудники",
      link: "/users",
    });

    _menu.push({
      icon: WarehouseIcon,
      title: "Склады",
      link: "/storages",
    });

    return _menu;
  }, [profile]);

  return menu;
};

export const useRoutePath = () => {
  const location = useLocation();
  return location.pathname;
}
