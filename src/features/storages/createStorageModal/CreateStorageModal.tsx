import { FC, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { Input } from "@/common/components/Input/Input";
import { useStoragesStore } from "@/stores/storagesStore";
import { useNotifications } from "@/stores/notificationsStore";

type Props = {
  onCloseModal: () => void;
};

const CreateStorageModal: FC<Props> = ({ onCloseModal }) => {
  const { createStorage } = useStoragesStore();
  const { addNotification } = useNotifications();
  const onClickCreateStorage = () => {
    if (!name || !address) {
      addNotification({
        message: "Задайте имя и адрес склада",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    createStorage({ name, address })
      .then(() => {
        addNotification({
          message: `Склад успешно создан`,
          type: "success",
          duration: 3000,
        });
        onCloseModal();
      })
      .catch((e) => {
        addNotification({
          message: `Ошибка при создании склада: ${e.message}`,
          type: "error",
          duration: 3000,
        });
      });
    onCloseModal();
  };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className={classes.container}>
      <span className={classes.title}>Добавление склада</span>
      <div className={classes.specItem}>
        Название склада*
        <Input
          placeholder="Введите название склада"
          inputType="outline"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={classes.specItem}>
        Адрес склада*
        <Input
          placeholder="Адрес"
          inputType="outline"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>

      <div className={classes.row}>
        <Button fullWidth onClick={onCloseModal}>
          Отменить
        </Button>
        <Button
          fullWidth
          onClick={() => {
            onClickCreateStorage();
          }}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export { CreateStorageModal };
