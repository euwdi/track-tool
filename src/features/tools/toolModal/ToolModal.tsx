import { FC, useEffect } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { useToolsStore } from "@/stores/toolsStore";
import { useUserStore } from "@/stores/userStore";
import { Loader } from "@/common/Loader/Loader";
import { useTransfersStore } from "@/stores/transfersStore";
import { StatusTag } from "@/common/ToolStatusTag/ToolStatusTag";

type Props = {
  onCloseModal: () => void;
  onMoveTool: () => void;
  canTakeTools?: boolean;
};

const ToolModal: FC<Props> = ({ onCloseModal, onMoveTool, canTakeTools }) => {
  const { currentTool, setMoveToolId, moveTool } = useToolsStore();
  const { transfers, getTransfersByTool } = useTransfersStore();
  const { profile } = useUserStore();

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

  useEffect(() => {
    console.log(currentTool);
    if (currentTool) getTransfersByTool(currentTool.id, 5);
  }, [currentTool, getTransfersByTool]);

  console.log(currentTool);

  if (!currentTool) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.specsContainer}>
        <div className={classes.title}> {currentTool.name}</div>

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
            <div className={classes.specDescr}>{currentTool.storage.name} </div>
          </div>
        )}
      </div>

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
    </div>
  );
};

export { ToolModal };
