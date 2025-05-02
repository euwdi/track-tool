import { FC, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { Input } from "@/common/components/Input/Input";
import { useToolsStore } from "@/stores/toolsStore";
import { PickStorageIdComponent } from "@/common/PickStorageIdComponent/PickStorageIdComponent";
import { useNotifications } from "@/stores/notificationsStore";

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
  const [type, setType] = useState("653f8e1b1c9d440000a1b2d0");
  const [storageId, setStorageId] = useState("");

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
      <Input
        placeholder="Тип"
        inputType="outline"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
        }}
      />

      Местоположение

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
