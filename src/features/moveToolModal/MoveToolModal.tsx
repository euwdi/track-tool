import { FC, useEffect, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/Button/Button";
import { useToolsStore } from "@/stores/toolsStore";
import Dropdown from "@/common/DropDown/Dropdown";
import { useStoragesStore } from "@/stores/storagesStore";
import { useUsersStore } from "@/stores/usersStore";

type Props = {
  onCloseModal: () => void;
};

const MoveToolModal: FC<Props> = ({ onCloseModal }) => {
  const { moveToolId, moveTool } = useToolsStore();
  const { storages, getStorages } = useStoragesStore();
  const { users, getUsers } = useUsersStore();
  
  const onClickCreateTool = () => {
    if (moveToolId) moveTool({ toolId: moveToolId, toStorageId });
    // onCloseModal();
  };
  const [toStorageId, setToStorageId] = useState("67a3178a49f85d137a6bb738");

  useEffect(() => {
    getStorages();
    getUsers();
    // options = [
    //   ...storages.map((storage) => {
    //     return { label: storage.name, value: storage.id };
    //   }),
    // ];
  }, []);

  return (
    <div className={classes.container}>
      <Dropdown
        options={users.map((user) => {
          return {
            label: user.lastName + " " + user.firstName + " " + user.middleName,
            value: user.id,
          };
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
