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

    if (!type) {
      addNotification({
        message: "Выберите тип инструмента",
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
      <div className={classes.specItem}>
        Название оборудования*
        <Input
          placeholder="Введите название"
          inputType="outline"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={classes.specItem}>
        Описание оборудования
        <Input
          placeholder="Введите описание"
          inputType="outline"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className={classes.specItem}>
        Тип инструмента*
        <Dropdown
          options={options}
          placeholder="Выберите тип"
          onSelect={(typeId) => {
            setType(typeId);
          }}
        />
      </div>

      <div className={classes.specItem}>
        Местоположение*
        <PickStorageIdComponent onChange={setStorageId} />
      </div>
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
