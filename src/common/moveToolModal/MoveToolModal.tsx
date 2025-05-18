import { FC, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { useToolsStore } from "@/stores/toolsStore";
import { PickStorageIdComponent } from "@/common/PickStorageIdComponent/PickStorageIdComponent";
import { useNotifications } from "@/stores/notificationsStore";

type Props = {
  onCloseModal: () => void;
};

const MoveToolModal: FC<Props> = ({ onCloseModal }) => {
  const { addNotification } = useNotifications();
  const { moveToolId, moveTool } = useToolsStore();

  const onClickCreateTool = () => {
    if (!toStorageId) {
      addNotification({
        message: `Выберите место назначения`,
        type: "warning",
        duration: 3000,
      });
      return
    }
    if (moveToolId) {
      moveTool({ toolId: moveToolId, toStorageId })
        .then(() => {
          addNotification({
            message: `Инструмент успешно перемещен`,
            type: "success",
            duration: 3000,
          });
          onCloseModal();
        })
        .catch((e) => {
          addNotification({
            message: `Ошибка при перемещении инструмента: ${e.message}`,
            type: "error",
            duration: 3000,
          });
        });
    }
  };
  const [toStorageId, setToStorageId] = useState("");
  return (
    <div className={classes.container}>
      <div className={classes.title}> Передача оборудования</div>
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
