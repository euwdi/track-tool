import { FC, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/Button/Button";
import { Input } from "@/common/Input/Input";
import { Table } from "@/common/Table/Table";
import { useToolsStore } from "@/stores/toolsStore";
import { Modal } from "@/common/Modal/Modal";
import { CreateToolModal } from "../createToolModal/CreateToolModal";
import { statusMapping } from "./types";
import { MoveToolModal } from "../moveToolModal/MoveToolModal";

const ToolsPage: FC<React.InputHTMLAttributes<HTMLInputElement>> = () => {
  const { getTools, tools, setMoveToolId } = useToolsStore();
  const [filterText, setFilterText] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [moveModalIsOpen, setMoveModalIsOpen] = useState(false);

  useEffect(() => {
    getTools();
  }, []);

  const tableData = useMemo(() => {
    return tools
      .filter((tool) =>
        tool.name.toLowerCase().includes(filterText.toLowerCase())
      )
      .map((tool) => ({
        fields: [tool.name, tool.description, statusMapping[tool.status]],
        onClickMove: () => {
          setMoveToolId(tool.id);
          setMoveModalIsOpen(true);
        },
      }));
  }, [filterText, tools]);
  const canAddTools = false;

  const onClickAddTool = () => {};

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        Оборудование
        {canAddTools && <Button onClick={() => {}} />}
      </div>

      <div className={classes.row}>
        <Input
          placeholder="Поиск по наименованию"
          inputType="outline"
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
          }}
        />
        <Button
          fullWidth
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          Добавить
        </Button>
      </div>

      <Table
        headers={["Наименование", "Описание", "Статус"]}
        data={
          tableData
          //   [
          //   ["Наименование", "Марка", "Состояние", "Категория", "Инв. №"],
          //   ["Наименование", "Марка", "Состояние", "Категория", "Инв. №"],
          // ]
        }
        isMoveble
      />

      <Modal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      >
        <CreateToolModal
          onCloseModal={() => {
            setModalIsOpen(false);
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

export { ToolsPage };
