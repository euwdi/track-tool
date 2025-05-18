import { FC, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { Input } from "@/common/components/Input/Input";
import { useToolsStore } from "@/stores/toolsStore";
import { PickStorageIdComponent } from "@/common/PickStorageIdComponent/PickStorageIdComponent";
import { useNotifications } from "@/stores/notificationsStore";
import Dropdown from "@/common/components/DropDown/Dropdown";
import { Modal } from "@/common/components/Modal/Modal";
import EditSpecList from "@/common/EditSpecList/EditSpecList";

type Props = {
  onCloseModal: () => void;
};

const CreateToolModal: FC<Props> = ({ onCloseModal }) => {
  const { addNotification } = useNotifications();
  const { types, getToolTypes, createTool } = useToolsStore();

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

    createTool({ name, description, typeId: type, storageId })
      .then(() => {
        addNotification({
          message: `Инструмент успешно создан`,
          type: "success",
          duration: 3000,
        });
        onCloseModal();
      })
      .catch((e) => {
        addNotification({
          message: `Ошибка при создании инструмента: ${e.message}`,
          type: "error",
          duration: 3000,
        });
      });
    onCloseModal();
  };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [storageId, setStorageId] = useState("");

  const [openSpecsModal, setOpenSpecsModal] = useState<"type" | "">("");

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
          onClickEdit={() => {
            setOpenSpecsModal("type");
          }}
        />
      </div>

      <div className={classes.specItem}>
        Местоположение*
        <PickStorageIdComponent onChange={setStorageId} />
      </div>

      <Modal
        isOpen={!!openSpecsModal}
        onClose={() => {
          setOpenSpecsModal("");
        }}
      >
        <EditSpecList
          title={"Типы инструментов"}
          onAdd={({ name }: { name: string }) => {}}
          onRefresh={getToolTypes}
          items={types.map((type) => {
            return {
              name: type.description,
              id: type.id,
            };
          })}
          onEdit={function ({ id, name }: { id: string; name: string }): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Modal>

      <div className={classes.row}>
        <Button fullWidth onClick={onCloseModal} variant="outline">
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
