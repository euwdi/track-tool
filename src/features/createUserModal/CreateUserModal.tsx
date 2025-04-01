import { FC, useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import { Button } from "@/common/Button/Button";
import { Input } from "@/common/Input/Input";
import { useUsersStore } from "@/stores/usersStore";
import { useRolesStore } from "@/stores/rolesStore";
import Dropdown from "@/common/DropDown/Dropdown";
import Calendar from "@/common/Calendar/Calendar";

type Props = {
  onCloseModal: () => void;
};

const CreateUserModal: FC<Props> = ({ onCloseModal }) => {
  const { createUser } = useUsersStore();
  const { roles, getRoles } = useRolesStore();

  const onClickCreateUser = () => {
    createUser({
      firstName,
      middleName,
      lastName,
      login,
      password,
      roleId,
      phone,
      startDate,
    });
    // onCloseModal();
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

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className={classes.container}>
      <Input
        placeholder="Фамилия"
        inputType="outline"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <Input
        placeholder="Имя"
        inputType="outline"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <Input
        placeholder="Отчество"
        inputType="outline"
        value={middleName}
        onChange={(e) => {
          setMiddleName(e.target.value);
        }}
      />
      <Input
        placeholder="Логин"
        inputType="outline"
        value={login}
        onChange={(e) => {
          setLogin(e.target.value);
        }}
      />
      <Input
        placeholder="Пароль"
        inputType="outline"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Input
        placeholder="Должность"
        inputType="outline"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Dropdown
        options={roles.map((role) => {
          return { label: role.name, value: role.id };
        })}
        onSelect={(roleId) => {
          setRoleId(roleId);
        }}
      />
      <Input
        placeholder="Телефон"
        inputType="outline"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      
      <Input
        placeholder="Дата трудоустройства"
        inputType="outline"
        value={startDate.toDateString()}
        onChange={(e) => {
          setStartDate(new Date(e.target.value));
        }}
      />

      <div className={classes.row}>
        <Button text="Отменить" fullWidth onClick={onCloseModal} />
        <Button
          text="Добавить"
          fullWidth
          onClick={() => {
            onClickCreateUser();
          }}
        />
      </div>
    </div>
  );
};

export { CreateUserModal };
