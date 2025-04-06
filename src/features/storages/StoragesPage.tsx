import { FC, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/Button/Button";
import { Input } from "@/common/Input/Input";
import { Table } from "@/common/Table/Table";
import { Modal } from "@/common/Modal/Modal";
import { CreateToolModal } from "../createToolModal/CreateToolModal";
import { useStoragesStore } from "@/stores/storagesStore";
import { CreateStorageModal } from "../createStorageModal/createStorageModal";

const StoragesPage: FC<React.InputHTMLAttributes<HTMLInputElement>> = () => {
  const { getStorages, storages } = useStoragesStore();
  const [filterText, setFilterText] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getStorages();
  }, []);

  const tableData = useMemo(() => {
    return storages
      .filter((storage) =>
        storage.name.toLowerCase().includes(filterText.toLowerCase())
      )
      .map((tool) => ({ fields: [tool.name, tool.address] }));
  }, [filterText, storages]);
  const canAddTools = false;

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>Склады</div>

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
          text="Добавить"
          fullWidth
          onClick={() => {
            setModalIsOpen(true);
          }}
        />
      </div>

      <Table
        headers={["Название", "Адрес"]}
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
        <CreateStorageModal
          onCloseModal={() => {
            setModalIsOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export { StoragesPage };
