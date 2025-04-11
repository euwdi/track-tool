type StorageItem = {
  id: string;
  name: string;
  address: string;
};

type Mover = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  roleName: string;
  roleSpec: string;
  phone: string;
  startDate: Date; 
  isCanceled: boolean;
};

type ToolType = {
  id: string;
  description: string;
};

type Tool = {
  id: string;
  description: string;
  status: string;
  name: string;
  registerDate: Date;
  startDate: Date;
  cancelDate: string;
  storageId: string;
  type: ToolType;
};

export type Transfer = {
  id: string;
  date: Date;
  fromStorage: StorageItem;
  toStorage: StorageItem;
  mover: Mover;
  tool: Tool;
};
