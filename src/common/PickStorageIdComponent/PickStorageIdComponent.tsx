import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import classes from "./style.module.scss";
import Dropdown from "../components/DropDown/Dropdown";
import { useStoragesStore } from "@/stores/storagesStore";
import { useUsersStore } from "@/stores/usersStore";

type Props = {
  onChange: (storageId: string) => void;
};

const PickStorageIdComponent: FC<PropsWithChildren<Props>> = ({ onChange }) => {
  const [tab, setTab] = useState<"emps" | "storages">("emps");
  const { getStorages, storages } = useStoragesStore();
  const { getUsers, users } = useUsersStore();

  useEffect(() => {
    getStorages();
    getUsers();
  }, []);

  const options = useMemo(() => {
    if (tab === "emps") {
      return users.map((user) => {
        return {
          label: user.lastName + " " + user.firstName + " " + user.middleName,
          value: user.storages[0].id,
        };
      });
    } else {
      return storages.map((storage) => {
        return {
          label: storage.name,
          value: storage.id,
        };
      });
    }
  }, [tab, users, storages]);

  return (
    <div className={classes.container}>
      <div className={classes.tabsContainer}>
        <div
          className={`${classes.tab} ${tab === "emps" && classes.active}`}
          onClick={() => {
            if (tab === "storages") {
              setTab("emps");
            }
          }}
        >
          Сотрудники
        </div>
        <div
          className={`${classes.tab} ${tab === "storages" && classes.active}`}
          onClick={() => {
            if (tab === "emps") {
              setTab("storages");
            }
          }}
        >
          Склады
        </div>
      </div>
      <div className={classes.dropdown}>
        <Dropdown
          options={options}
          placeholder="Выберите местоположение"
          onSelect={(roleId) => {
            onChange(roleId);
          }}
        />
      </div>
    </div>
  );
};

export { PickStorageIdComponent };
