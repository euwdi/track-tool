import { FC, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { Input } from "@/common/components/Input/Input";
import { Table } from "@/common/Table/Table";
import { useToolsStore } from "@/stores/toolsStore";
import { Modal } from "@/common/components/Modal/Modal";
import { CreateToolModal } from "./createToolModal/CreateToolModal";
import { ToolStatusEnum, statusMapping } from "./types";
import { ToolModal } from "./toolModal/toolModal";
import { MoveToolModal } from "../../common/moveToolModal/MoveToolModal";
import Dropdown from "@/common/components/DropDown/Dropdown";
import { StatusTag } from "@/common/ToolStatusTag/ToolStatusTag";

const ToolsPage: FC<React.InputHTMLAttributes<HTMLInputElement>> = () => {
  const { getTools, tools, setMoveToolId, setCurrentTool } = useToolsStore();
  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState("all");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toolModalIsOpen, setToolModalIsOpen] = useState(false);
  const [moveModalIsOpen, setMoveModalIsOpen] = useState(false);

  useEffect(() => {
    getTools();
  }, []);

  const tableData = useMemo(() => {
    return tools
      .filter((tool) =>
        tool.name.toLowerCase().includes(filterText.toLowerCase())
      )
      .filter((tool) => {
        if (status === ToolStatusEnum.ALL) return true;
        else return tool.status === status;
      })
      .map((tool) => ({
        fields: [
          tool.name,
          tool.description,
          <StatusTag status={tool.status} />,
          tool.storage.name,
        ],
        onClick: () => {
          setCurrentTool(tool);
          setToolModalIsOpen(true);
        },
      }));
  }, [filterText, setMoveToolId, tools, status]);
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

      <div className={classes.dropdown}>
        <Dropdown
          options={Object.values(ToolStatusEnum).map((statusName) => ({
            label: statusMapping[statusName],
            value: statusName,
          }))}
          onSelect={(statusName) => {
            setStatus(statusName);
          }}
          placeholder="Фильтр по статусу"
        />
      </div>

      <Table
        headers={["Наименование", "Описание", "Статус", "Местоположение"]}
        data={
          tableData
          //   [
          //   ["Наименование", "Марка", "Состояние", "Категория", "Инв. №"],
          //   ["Наименование", "Марка", "Состояние", "Категория", "Инв. №"],
          // ]
        }
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
          canTakeTools
        />
      </Modal>
    </div>
  );
};

export { ToolsPage };
