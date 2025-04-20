import { FC, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { Input } from "@/common/components/Input/Input";
import { Table } from "@/common/Table/Table";
import { useToolsStore } from "@/stores/toolsStore";
import { PickStorageIdComponent } from "@/common/PickStorageIdComponent/PickStorageIdComponent";

type Props = {
  onCloseModal: () => void;
};

const CreateToolModal: FC<Props> = ({ onCloseModal }) => {
  const { createTool } = useToolsStore();
  const onClickCreateTool = () => {
    createTool({ name, typeId: type, storageId });
    onCloseModal();
  };
  const [name, setName] = useState("");
  const [type, setType] = useState("653f8e1b1c9d440000a1b2d0");
  const [storageId, setStorageId] = useState("");

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

      <PickStorageIdComponent onChange={setStorageId} />

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
