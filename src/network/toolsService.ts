import { Tool } from "@/types/tools.types";
import { axios } from "./api";

class ToolsService {
  public async getTools() {
    const response = await axios.get<Tool[]>("/api/tools");

    return response.data;
  }

  public async getMyTools() {
    const response = await axios.get<Tool[]>("/api/tools/me");

    return response.data;
  }

  public async createTool({
    name,
    typeId,
    storageId,
  }: {
    name: string;
    typeId: string;
    storageId: string;
  }) {
    const response = await axios.post("/api/tools", {
      name,
      description: name,
      typeId,
      storageId,
      startDate: new Date(),
    });

    // {
    //   "name": "string",
    //   "description": "string",
    //   "typeId": "string",
    //   "startDate": "2025-04-06T12:41:06.666Z",
    //   "storageId": "string"
    // }

    return response.data;
  }

  public async moveTool({
    toolId,
    toStorageId,
  }: {
    toolId: string;
    toStorageId: string;
  }) {
    const response = await axios.patch(`/api/tools/${toolId}`, {
      toStorageId
    });

    return response.data;
  }
}

const toolsService = new ToolsService();
export { toolsService };