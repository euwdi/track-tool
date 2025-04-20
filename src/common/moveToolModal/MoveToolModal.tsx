import { FC, useEffect, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { useToolsStore } from "@/stores/toolsStore";
import Dropdown from "@/common/components/DropDown/Dropdown";
import { useStoragesStore } from "@/stores/storagesStore";
import { useUsersStore } from "@/stores/usersStore";
import { PickStorageIdComponent } from "@/common/PickStorageIdComponent/PickStorageIdComponent";

type Props = {
  onCloseModal: () => void;
};

const MoveToolModal: FC<Props> = ({ onCloseModal }) => {
  const { moveToolId, moveTool } = useToolsStore();
  const { storages, getStorages } = useStoragesStore();
  const { users, getUsers } = useUsersStore();

  const onClickCreateTool = () => {
    if (moveToolId) {
      moveTool({ toolId: moveToolId, toStorageId });
      onCloseModal();
    }
  };
  const [toStorageId, setToStorageId] = useState("67a3178a49f85d137a6bb738");
  return (
    <div className={classes.container}>
      <PickStorageIdComponent onChange={setToStorageId} />

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
