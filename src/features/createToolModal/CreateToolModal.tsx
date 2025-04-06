import { FC, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/Button/Button";
import { Input } from "@/common/Input/Input";
import { Table } from "@/common/Table/Table";
import { useToolsStore } from "@/stores/toolsStore";

type Props = {
  onCloseModal: () => void;
};

const CreateToolModal: FC<Props> = ({ onCloseModal }) => {
  const { createTool } = useToolsStore();
  const onClickCreateTool = () => {
    createTool({ name, typeId: type, storageId });
    // onCloseModal();
  };
  const [name, setName] = useState("");
  const [type, setType] = useState("653f8e1b1c9d440000a1b2d0");
  const [storageId, setStorageId] = useState("67a3178a49f85d137a6bb738");

  // const [filterText, setFilterText] = useState("");

  // useEffect(() => {
  //   getMyTools();
  // }, []);

  // const tableData = useMemo(() => {
  //   return myTools
  //     .filter((tool) =>
  //       tool.name.toLowerCase().includes(filterText.toLowerCase())
  //     )
  //     .map((tool) => [tool.name, tool.description]);
  // }, [filterText, myTools]);
  // const canAddTools = false;

  return (
    <div className={classes.container}>
      <Input
        placeholder="Название"
        inputType="outline"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Input
        placeholder="Тип"
        inputType="outline"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
        }}
      />

      <div className={classes.row}>
        <Button fullWidth onClick={onCloseModal}>
          Отменить
        </Button>

        <Button
          fullWidth
          onClick={() => {
            onClickCreateTool();
          }}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export { CreateToolModal };
