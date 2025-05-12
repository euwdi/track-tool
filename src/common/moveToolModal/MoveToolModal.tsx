import { FC, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { useToolsStore } from "@/stores/toolsStore";
import { PickStorageIdComponent } from "@/common/PickStorageIdComponent/PickStorageIdComponent";

type Props = {
  onCloseModal: () => void;
};

const MoveToolModal: FC<Props> = ({ onCloseModal }) => {
  const { moveToolId, moveTool } = useToolsStore();

  const onClickCreateTool = () => {
    if (moveToolId) {
      moveTool({ toolId: moveToolId, toStorageId });
      console.log(moveTool);
      
      onCloseModal();
    }
  };
  const [toStorageId, setToStorageId] = useState("67a3178a49f85d137a6bb730");
  return (
    <div className={classes.container}>
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
