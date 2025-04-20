import { FC, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { Input } from "@/common/components/Input/Input";
import { useStoragesStore } from "@/stores/storagesStore";

type Props = {
  onCloseModal: () => void;
};

const CreateStorageModal: FC<Props> = ({ onCloseModal }) => {
  const { createStorage, getStorages } = useStoragesStore();
  const onClickCreateStorage = () => {
    createStorage({ name, address });
    // onCloseModal();
  };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // const [filterText, setFilterText] = useState("");

  // useEffect(() => {
  //   getMyTools();
  // }, []);

  // const tableData = useMemo(() => {
  //   return myTools
  //     .filter((tool) =>
  //       tool.name.toLowerCase().includes(filterText.toLowerCase())
  //     )
  //     .map((tool) => [tool.name, tool.description]);
  // }, [filterText, myTools]);
  // const canAddTools = false;

  return (
    <div className={classes.container}>
      <Input
        placeholder="Название"
        inputType="outline"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Input
        placeholder="Адрес"
        inputType="outline"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />

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
