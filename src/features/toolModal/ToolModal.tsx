import { FC, useEffect } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/Button/Button";
import { useToolsStore } from "@/stores/toolsStore";
import { useUserStore } from "@/stores/userStore";
import { Loader } from "@/common/Loader/Loader";
import { useTransfersStore } from "@/stores/transfersStore";

type Props = {
  onCloseModal: () => void;
  onMoveTool: () => void;
};

const ToolModal: FC<Props> = ({ onCloseModal, onMoveTool }) => {
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
    if (currentTool) getTransfersByTool(currentTool.id, 5);
  }, [currentTool, getTransfersByTool]);

  if (!currentTool) {
    return <Loader />;
  }

  const transfersData = transfers.map((transfer) => {
    console.log(typeof transfer.date);
    return (
      <div className={classes.transfer}>
        <div className={classes.transferDate}>
          {new Date(transfer.date).toDateString()}
        </div>
        <div className={classes.transferTo}>
          {transfer.fromStorage.name} - {transfer.toStorage.name}
        </div>
      </div>
    );
  });

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
          <div className={classes.specDescr}>{currentTool.status} </div>
        </div>

        <div className={classes.spec}>
          <div className={classes.specTitle}>Местонахождение </div>
          <div className={classes.specDescr}>{currentTool.storage.name} </div>
        </div>
      </div>
      <div className={classes.transfersContainer}>{transfersData}</div>

      <div className={classes.row}>
        <Button fullWidth onClick={onClickTakeTool}>
          Взять
        </Button>
        <Button fullWidth onClick={onClickMoveTool}>
          Передать
        </Button>
      </div>
    </div>
  );
};

export { ToolModal };
