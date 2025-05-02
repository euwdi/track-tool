import { FC, createElement } from "react";
import classes from "./style.module.scss";

import { useNavigate } from "react-router";
import { useRoutePath, useMenuItems } from "./hooks";

type Tab = {
  title: string;
  link: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const Menu: FC = () => {
  const navigator = useNavigate();
  const baseRoutePath = useRoutePath();
  console.log(baseRoutePath);

  const menuTabs: Tab[] = useMenuItems();
  return (
    <>
      <div className={classes.container}>
        {menuTabs.map((item) => (
          <div
            className={`${classes.menuItem} ${
              item.link === baseRoutePath ? classes.activeItem : ""
            }`}
          >
            <button
              className={classes.menuItem}
              onClick={() => navigator(item.link)}
              key={`menu-item-${item.title}`}
            >
              {item.title}
              {item.icon && createElement(item.icon)}
            </button>
            <div
              className={`${classes.bar} ${
                item.link === baseRoutePath ? classes.active : ""
              }`}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};

export { Menu };
