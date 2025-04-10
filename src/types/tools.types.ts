import { StatusesTitles } from "@/features/tools/types";
import { Storage } from "./storages.types";
export type Tool = {
  tool: any;
  id: string;
  description: string;
  status: StatusesTitles;
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
};
