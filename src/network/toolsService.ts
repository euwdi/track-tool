import { Tool } from "@/types/tools.types";
import { axios } from "./api";
import { StatusesTitles } from "@/features/tools/types";

class ToolsService {
  public async getTools() {
    const response = await axios.get<Tool[]>("/api/tools");
    console.log(response.data);

    return response.data;
  }

  public async getMyTools() {
    const response = await axios.get<Tool[]>("/api/tools/me");
    console.log(response.data);

    return response.data;
  }

  public async createTool({
    name,
    type,
    storageId,
  }: {
    name: string;
    type: string;
    storageId: string;
  }) {
    const response = await axios.post("/api/tools", {
      name,
      type,
      storage_id: storageId,
      status: StatusesTitles.AVAILABLE,
    });

    // "name": "string",
    // "type": "string",
    // "storage_id": 0,
    // "status": "string",
    // "children_ids": [
    //   "string"
    // ],
    // "transfers_ids": [
    //   "string"
    // ]
    return response.data;
  }
}

const toolsService = new ToolsService();
export { toolsService };
