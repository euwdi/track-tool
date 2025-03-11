import { FC, useEffect } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/Button/Button";
import { Input } from "@/common/Input/Input";
import { Table } from "@/common/Table/Table";
import { toolsService } from "@/network/toolsService";

const MyToolsPage: FC<React.InputHTMLAttributes<HTMLInputElement>> = () => {
  useEffect(() => {
    toolsService.getMyTools();
  }, []);

  const canAddTools = false;

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        Моё оборудование
        {canAddTools && <Button onClick={() => {}} />}
      </div>
      <Input placeholder="Поиск по наименованию" inputType="outline" />

      <Table
        headers={["Наименование", "Марка", "Состояние", "Категория", "Инв. №"]}
        data={[
          ["Наименование", "Марка", "Состояние", "Категория", "Инв. №"],
          ["Наименование", "Марка", "Состояние", "Категория", "Инв. №"],
        ]}
      />
    </div>
  );
};

export { MyToolsPage };
