import { FC, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/Button/Button";
import { Input } from "@/common/Input/Input";
import { Table } from "@/common/Table/Table";
import { Modal } from "@/common/Modal/Modal";
import { useUsersStore } from "@/stores/usersStore";
import { CreateUserModal } from "../createUserModal/CreateUserModal";

const UsersPage: FC<React.InputHTMLAttributes<HTMLInputElement>> = () => {
  const { getUsers, users } = useUsersStore();
  const [filterText, setFilterText] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const tableData = useMemo(() => {
    return users
      .filter((user) =>
        user.lastName.toLowerCase().includes(filterText.toLowerCase())
      )
      .map((user) => ({
        fields: [
          user.lastName + " " + user.firstName + " " + user.middleName,
          user.title,
          user.roleName,
          user.phone,
        ],
      }));
  }, [filterText, users]);
  const canAddUsers = true;

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>Сотрудники</div>
      <div className={classes.row}>
        <Input
          placeholder="Поиск по фамилии"
          inputType="outline"
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
          }}
        />
        {canAddUsers && (
          <Button
            fullWidth
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            Добавить
          </Button>
        )}
      </div>

      <Table
        headers={["ФИО", "Должность", "Роль", "Телефон"]}
        data={
          tableData
          //   [
          //   ["Наименование", "Марка", "Состояние", "Категория", "Инв. №"],
          //   ["Наименование", "Марка", "Состояние", "Категория", "Инв. №"],
          // ]
        }
      />

      <Modal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      >
        <CreateUserModal
          onCloseModal={() => {
            setModalIsOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export { UsersPage };
