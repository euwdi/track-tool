import { FC, useEffect, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { useToolsStore } from "@/stores/toolsStore";
import { useUserStore } from "@/stores/userStore";
import { Loader } from "@/common/Loader/Loader";
import { useTransfersStore } from "@/stores/transfersStore";
import { StatusTag } from "@/common/ToolStatusTag/ToolStatusTag";
import ImageGallery from "@/common/ImageGallery/ImageGallery";
import { Modal } from "@/common/components/Modal/Modal";
import { useNotifications } from "@/stores/notificationsStore";

type Props = {
  onCloseModal: () => void;
  onMoveTool: () => void;
  canTakeTools?: boolean;
};

const ToolModal: FC<Props> = ({ onCloseModal, onMoveTool, canTakeTools }) => {
  const { addNotification } = useNotifications();
  const { currentTool, deleteTool, setMoveToolId, moveTool } = useToolsStore();
  const { transfers, getTransfersByTool } = useTransfersStore();
  const { profile } = useUserStore();

  const [openedDeleteModal, setOpenedDeleteModal] = useState<boolean>(false);

  const onClickTakeTool = () => {
    if (currentTool)
      moveTool({
        toolId: currentTool?.id,
        toStorageId: profile.storages[0].id,
      });
    onCloseModal();
  };

  const onClickMoveTool = () => {
    setMoveToolId(currentTool?.id);
    onMoveTool();
  };

  const onClickDeleteTool = () => {
    setOpenedDeleteModal(true);
  };

  const deleteToolF = () => {
    if (currentTool) {
      deleteTool({ toolId: currentTool.id })
        .then(() => {
          addNotification({
            message: `Инструмент успешно удален`,
            type: "success",
            duration: 3000,
          });
          setOpenedDeleteModal(false);
          onCloseModal();
        })
        .catch((e) => {
          addNotification({
            message: `Ошибка при удалении инструмента: ${e.message}`,
            type: "error",
            duration: 3000,
          });
        });
    }
  };

  useEffect(() => {
    if (currentTool) getTransfersByTool(currentTool.id, 5);
  }, [currentTool, getTransfersByTool]);

  if (!currentTool) {
    return <Loader />;
  }

  return (
    <div className={classes.container} tabIndex={1}>
      <div className={classes.title}> {currentTool.name}</div>

      <div className={classes.contentContainer}>
        <div className={classes.specsContainer}>
          <div className={classes.spec}>
            <div className={classes.specTitle}>Описание </div>
            <div className={classes.specDescr}>{currentTool.description} </div>
          </div>

          <div className={classes.spec}>
            <div className={classes.specTitle}>Статус </div>
            <div className={classes.specDescr}>
              <StatusTag status={currentTool.status} />
            </div>
          </div>

          {canTakeTools && (
            <div className={classes.spec}>
              <div className={classes.specTitle}>Местонахождение </div>
              <div className={classes.specDescr}>
                {currentTool.storage.name}{" "}
              </div>
            </div>
          )}
        </div>
        {currentTool.photos.length > 0 && (
          <ImageGallery images={currentTool.photos} />
        )}

        {transfers.length > 0 && (
          <div className={classes.transfersContainer}>
            История перемещений
            {transfers.map((transfer) => (
              <div className={classes.transfer}>
                <div className={classes.transferTo}>
                  {transfer.toStorage.name}
                </div>
                <div className={classes.transferDate}>
                  {new Date(transfer.date).toLocaleDateString("ru", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={classes.deleteContainer}>
          <Button fullWidth onClick={onClickDeleteTool}>
            Удалить инструмент
          </Button>
        </div>
      </div>

      <div className={classes.row}>
        {canTakeTools && (
          <Button fullWidth onClick={onClickTakeTool}>
            Взять
          </Button>
        )}
        <Button fullWidth onClick={onClickMoveTool}>
          Передать
        </Button>
      </div>

      <Modal
        isOpen={openedDeleteModal}
        onClose={() => {
          setOpenedDeleteModal(false);
        }}
      >
        <div className={classes.deleteModal}>
          Вы уверены, что хотите удалить оборудование?
          <div className={classes.row}>
            <div className={classes.fill}>
              <Button fullWidth onClick={() => setOpenedDeleteModal(false)}>
                Не совсем
              </Button>
            </div>
            <div className={classes.outline}>
              <Button fullWidth onClick={deleteToolF}>
                Абсолютно
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export { ToolModal };
