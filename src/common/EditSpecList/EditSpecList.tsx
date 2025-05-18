import React, { FC, useState } from "react";
import styles from "./style.module.scss";
import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";
import EditIcon from "@/assets/edit.svg?react";

type Item = {
  id: string;
  name: string;
};

export type Props = {
  onAdd: ({ name }: { name: string }) => void;
  onEdit: ({ id, name }: { id: string; name: string }) => void;
  onRefresh: () => void;
  items: Item[];
  title: string;
};

const EditSpecList: FC<Props> = ({ items, onAdd, title, onEdit }) => {
  const [name, setName] = useState("");
  const handleSubmit = () => {
    onAdd({ name });
  };

  const onClickEdit = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>

      <div className={styles.list}>
        {items
          .filter((item) => !!item.name)
          .map((item) => (
            <div className={styles.item}>
              {item.name}
              <button className={styles.editButton} onClick={onClickEdit}>
                <EditIcon />
              </button>
            </div>
          ))}
      </div>

      <div className={styles.subtitle}>Добавить элемент</div>

      <div className={styles.newItem}>
        <Input
          placeholder="Введите наименование"
          inputType="outline"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Button onClick={handleSubmit}>Добавить</Button>
      </div>
    </div>
  );
};

export default EditSpecList;
