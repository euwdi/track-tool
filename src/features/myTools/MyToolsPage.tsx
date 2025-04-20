import { FC, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import { Input } from "@/common/components/Input/Input";
import { Table } from "@/common/Table/Table";
import { useToolsStore } from "@/stores/toolsStore";
import { Modal } from "@/common/components/Modal/Modal";
import { ToolModal } from "../tools/toolModal/toolModal";
import { MoveToolModal } from "@/common/moveToolModal/MoveToolModal";

const MyToolsPage: FC<React.InputHTMLAttributes<HTMLInputElement>> = () => {
  const { getMyTools, myTools, setCurrentTool } = useToolsStore();

  const [filterText, setFilterText] = useState("");

  const [toolModalIsOpen, setToolModalIsOpen] = useState(false);
  const [moveModalIsOpen, setMoveModalIsOpen] = useState(false);

  useEffect(() => {
    getMyTools();
  }, []);

  const tableData = useMemo(() => {
    return myTools
      .filter((tool) =>
        tool.name.toLowerCase().includes(filterText.toLowerCase())
      )
      .map((tool) => ({
        fields: [tool.name, tool.description],
        onClick: () => {
          setCurrentTool(tool);
          setToolModalIsOpen(true);
        },
      }));
  }, [filterText, myTools]);

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>Моё оборудование</div>

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

      <Modal
        isOpen={toolModalIsOpen}
        onClose={() => {
          setToolModalIsOpen(false);
        }}
      >
        <ToolModal
          onMoveTool={() => {
            setMoveModalIsOpen(true);
            setToolModalIsOpen(false);
          }}
          onCloseModal={() => {
            setToolModalIsOpen(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={moveModalIsOpen}
        onClose={() => {
          setMoveModalIsOpen(false);
        }}
      >
        <MoveToolModal
          onCloseModal={() => {
            setMoveModalIsOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export { MyToolsPage };
