import { Storage } from "./storages.types";

export type User = {
  id: string;
  cancelDate: Date | null;
  firstName: string;
  isCanceled: boolean;
  lastName: string;
  middleName: string;
  login: string;
  phone: string;
  roleId: string;
  startDate: Date;
  roleName: string;
  title: Title;

  storages: Storage[];
};

export type Title = {
  id: string;
  name: string;
};

export type CreateUser = {
  firstName: string;
  middleName: string;
  lastName: string;
  login: string;
  password: string;
  phone: string;
  roleId: string;
  startDate: Date;
  titleId: string;
};
