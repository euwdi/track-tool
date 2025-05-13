import { FC, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { Input } from "@/common/components/Input/Input";
import { useToolsStore } from "@/stores/toolsStore";
import { PickStorageIdComponent } from "@/common/PickStorageIdComponent/PickStorageIdComponent";
import { useNotifications } from "@/stores/notificationsStore";
import Dropdown from "@/common/components/DropDown/Dropdown";

type Props = {
  onCloseModal: () => void;
};

const CreateToolModal: FC<Props> = ({ onCloseModal }) => {
  const { addNotification } = useNotifications();
  const { createTool } = useToolsStore();
  const onClickCreateTool = () => {
    if (!name || !storageId) {
      addNotification({
        message: "Задайте имя и выберите склад",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    createTool({ name, description, typeId: type, storageId });
    onCloseModal();
  };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const { types, getToolTypes } = useToolsStore();
  const [storageId, setStorageId] = useState("");

  useEffect(() => {
    getToolTypes();
  }, [getToolTypes]);

  const options = useMemo(() => {
    return types.map((type) => {
      return {
        label: type.description,
        value: type.id,
      };
    });
  }, [types]);

  return (
    <div className={classes.container}>
      <span className={classes.title}>Добавление оборудования</span>
      <Input
        placeholder="Название"
        inputType="outline"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Input
        placeholder="Описание"
        inputType="outline"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <Dropdown
        options={options}
        placeholder="Тип инструмента"
        onSelect={(typeId) => {
          setType(typeId);
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
          Создать
        </Button>
      </div>
    </div>
  );
};

export { CreateToolModal };
