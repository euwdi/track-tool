import { StatusesTitles } from "@/features/tools/types";

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
  type: {
    id: string;
    description: string;
  };
};
