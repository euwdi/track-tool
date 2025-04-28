import { ToolStatus } from "@/features/tools/types";
import { Storage } from "./storages.types";

export type Tool = {
  id: string;
  description: string;
  status: ToolStatus;
  name: string;
  registerDate: string;
  startDate: string;
  cancelDate: string;
  storageId: string;
  storage: Storage;
  type: {
    id: string;
    description: string;
  };
  photos: string[]
};
