import { FC, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/components/Button/Button";
import { Input } from "@/common/components/Input/Input";
import { useUsersStore } from "@/stores/usersStore";
import { useRolesStore } from "@/stores/rolesStore";
import Dropdown from "@/common/components/DropDown/Dropdown";
import Calendar from "@/common/components/Calendar/Calendar";
import { useNotifications } from "@/stores/notificationsStore";
import { Modal } from "@/common/components/Modal/Modal";
import EditSpecList from "@/common/EditSpecList/EditSpecList";

type Props = {
  onCloseModal: () => void;
};

const CreateUserModal: FC<Props> = ({ onCloseModal }) => {
  const { titles, createUser, getTitles, createTitle } = useUsersStore();
  const { addNotification } = useNotifications();
  const { roles, getRoles } = useRolesStore();

  const onClickCreateUser = () => {
    if (!firstName || !lastName || !login || !password || !roleId || !phone) {
      addNotification({
        message: "Заполните все обязательные поля",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    createUser({
      firstName,
      middleName,
      lastName,
      login,
      password,
      roleId,
      phone,
      startDate,
      titleId: title,
    })
      .then(() => {
        addNotification({
          message: `Сотрудник успешно добавлен`,
          type: "success",
          duration: 3000,
        });
        onCloseModal();
      })
      .catch((e) => {
        addNotification({
          message: `Ошибка при добавлении сотрудника: ${e.message}`,
          type: "error",
          duration: 3000,
        });
      });
    onCloseModal();
  };
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [roleId, setRoleId] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [openSpecsModal, setOpenSpecsModal] = useState<"title" | "">("");

  useEffect(() => {
    getRoles();
    getTitles();
  }, []);

  return (
    <div className={classes.container}>
      <span className={classes.title}>Добавление сотрудника</span>
      <div className={classes.specItem}>
        Фамилия*
        <Input
          placeholder="Фамилия"
          inputType="outline"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>
      <div className={classes.specItem}>
        Имя*
        <Input
          placeholder="Имя"
          inputType="outline"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </div>
      <div className={classes.specItem}>
        Отчество
        <Input
          placeholder="Отчество"
          inputType="outline"
          value={middleName}
          onChange={(e) => {
            setMiddleName(e.target.value);
          }}
        />
      </div>
      <div className={classes.specItem}>
        Логин*
        <Input
          placeholder="Логин"
          inputType="outline"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
      </div>
      <div className={classes.specItem}>
        Пароль*
        <Input
          placeholder="Пароль"
          inputType="outline"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
        />
      </div>
      <div className={classes.specItem}>
        Должность*
        <Dropdown
          options={titles.map((title) => {
            return { label: title.name, value: title.id };
          })}
          onSelect={(titleId) => {
            setTitle(titleId);
          }}
          onClickEdit={() => {
            setOpenSpecsModal("title");
          }}
        />
      </div>
      <div className={classes.specItem}>
        Роль*
        <Dropdown
          options={roles.map((role) => {
            return { label: role.name, value: role.id };
          })}
          onSelect={(roleId) => {
            setRoleId(roleId);
          }}
        />
      </div>
      <div className={classes.specItem}>
        Телефон*
        <Input
          placeholder="Телефон"
          inputType="outline"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </div>
      <div className={classes.specItem}>
        Дата трудоустройства
        <Input
          placeholder="Дата трудоустройства"
          inputType="outline"
          value={startDate.toDateString()}
          onChange={(e) => {
            setStartDate(new Date(e.target.value));
          }}
        />
      </div>

      <Modal
        isOpen={!!openSpecsModal}
        onClose={() => {
          setOpenSpecsModal("");
        }}
      >
        <EditSpecList
          onAdd={({ name }: { name: string }) => {
            createTitle({ name })
              .then(() => {
                addNotification({
                  message: `Должность успешно создана`,
                  type: "success",
                  duration: 3000,
                });
              })
              .catch((e) => {
                addNotification({
                  message: `Ошибка при создании должности: ${e.message}`,
                  type: "error",
                  duration: 3000,
                });
              });
          }}
          onRefresh={getTitles}
          items={titles}
          title={"Должности сотрудников"}
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
            onClickCreateUser();
          }}
        >
          Добавить
        </Button>
      </div>
    </div>
  );
};

export { CreateUserModal };
