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
  title: string;
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
  //title: string;
};
