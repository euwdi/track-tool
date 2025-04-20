import { useUserStore } from "@/stores/userStore";
import { useMemo } from "react";
import BagIcon from "@/assets/bag.svg?react";
import EmpsIcon from "@/assets/emps.svg?react";
import ToolsIcon from "@/assets/tools.svg?react";
import WarehouseIcon from "@/assets/warehouse.svg?react";
import { Roles } from "@/types/roles.types";

export const useMenuItems = () => {
  const { profile } = useUserStore();

  const menu = useMemo(() => {
    const _menu: {
      title: string;
      link: string;
      icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    }[] = [
      {
        logo: BagIcon,
        title: "Мое оборудование",
        link: "/tools/me",
      },
    ];

    if (profile.roleId === Roles.EMP) return _menu;

    _menu.push({
      logo: ToolsIcon,
      title: "Оборудование",
      link: "/tools",
    });

    if (profile.roleId === Roles.USER) return _menu;

    _menu.push({
      logo: EmpsIcon,
      title: "Сотрудники",
      link: "/users",
    });

    _menu.push({
      logo: WarehouseIcon,
      title: "Склады",
      link: "/storages",
    });

    return _menu;
  }, [profile]);

  return menu;
};
