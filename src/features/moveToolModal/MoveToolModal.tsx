import { FC, useEffect, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/Button/Button";
import { useToolsStore } from "@/stores/toolsStore";
import Dropdown from "@/common/DropDown/Dropdown";
import { useStoragesStore } from "@/stores/storagesStore";

type Props = {
  onCloseModal: () => void;
};

const MoveToolModal: FC<Props> = ({ onCloseModal }) => {
  const { moveToolId, moveTool } = useToolsStore();
  const { storages, getStorages } = useStoragesStore();
  const onClickCreateTool = () => {
    if (moveToolId) moveTool({ toolId: moveToolId, toStorageId });
    // onCloseModal();
  };
  const [toStorageId, setToStorageId] = useState("67a3178a49f85d137a6bb738");

  useEffect(() => {
    getStorages();
  }, []);

  return (
    <div className={classes.container}>
      <Dropdown
        options={storages.map((storage) => {
          return { label: storage.name, value: storage.id };
        })}
        onSelect={(roleId) => {
          setToStorageId(roleId);
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

export { MoveToolModal };
