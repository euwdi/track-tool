import { FC, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { Input } from "@/common/components/Input/Input";
import { Table } from "@/common/Table/Table";
import { useToolsStore } from "@/stores/toolsStore";

const MyToolsPage: FC<React.InputHTMLAttributes<HTMLInputElement>> = () => {
  const { getMyTools, myTools } = useToolsStore();
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    getMyTools();
  }, []);

  const tableData = useMemo(() => {
    return myTools
      .filter((tool) =>
        tool.name.toLowerCase().includes(filterText.toLowerCase())
      )
      .map((tool) => ({ fields: [tool.name, tool.description] }));
  }, [filterText, myTools]);
  const canAddTools = false;

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        Моё оборудование
        {canAddTools && <Button onClick={() => {}} />}
      </div>
      <Input
        placeholder="Поиск по наименованию"
        inputType="outline"
        value={filterText}
        onChange={(e) => {
          setFilterText(e.target.value);
        }}
      />

      <Table
        headers={["Наименование", "Описание"]}
        data={
          tableData
          //   [
          //   ["Наименование", "Марка", "Состояние", "Категория", "Инв. №"],
          //   ["Наименование", "Марка", "Состояние", "Категория", "Инв. №"],
          // ]
        }
      />
    </div>
  );
};

export { MyToolsPage };
