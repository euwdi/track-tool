import { FC, useEffect } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { useToolsStore } from "@/stores/toolsStore";
import { useUserStore } from "@/stores/userStore";
import { Loader } from "@/common/Loader/Loader";
import { useTransfersStore } from "@/stores/transfersStore";
import { StatusTag } from "@/common/ToolStatusTag/ToolStatusTag";
import ImageGallery from "@/common/ImageGallery/ImageGallery";

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
    if (currentTool) getTransfersByTool(currentTool.id, 5);
  }, [currentTool, getTransfersByTool]);

  if (!currentTool) {
    return <Loader />;
  }

  return (
    <div className={classes.container} tabIndex={1}>
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
      <ImageGallery
        images={[
          "https://i.pinimg.com/originals/ac/68/73/ac687378399dbc0cebed200e76e9cecf.png",
          "https://avatars.mds.yandex.net/i?id=ffe7e29a3fd7730051e604d20f093206_l-5552240-images-thumbs&n=13",
          "https://i.pinimg.com/originals/ac/68/73/ac687378399dbc0cebed200e76e9cecf.png",
          "https://i.pinimg.com/originals/ac/68/73/ac687378399dbc0cebed200e76e9cecf.png",
          "https://avatars.mds.yandex.net/i?id=ffe7e29a3fd7730051e604d20f093206_l-5552240-images-thumbs&n=13",
          "https://i.pinimg.com/originals/ac/68/73/ac687378399dbc0cebed200e76e9cecf.png",

          "https://i.pinimg.com/originals/ac/68/73/ac687378399dbc0cebed200e76e9cecf.png",
          "https://avatars.mds.yandex.net/i?id=ffe7e29a3fd7730051e604d20f093206_l-5552240-images-thumbs&n=13",
          "https://i.pinimg.com/originals/ac/68/73/ac687378399dbc0cebed200e76e9cecf.png",
        ]}
      />

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
