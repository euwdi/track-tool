import { FC, useEffect } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/Button/Button";
import { Input } from "@/common/Input/Input";
import Logo from "@/assets/logo.svg?react";
import { storageService } from "@/network/storageService";
import { Table } from "@/common/Table/Table";
import { toolsService } from "@/network/toolsService";

const InstrumentsPage: FC<React.InputHTMLAttributes<HTMLInputElement>> = () => {
  useEffect(() => {
    toolsService.getTools();
  }, []);

  const canAddTools = false;

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        Мое оборудование
        {canAddTools && <Button onClick={() => {}} />}
      </div>
      <Input />

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

export { InstrumentsPage };
