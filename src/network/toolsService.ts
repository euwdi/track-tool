import { Tool } from "@/types/tools.types";
import { axios } from "./api";

class ToolsService {
  public async getTools() {
    const response = await axios.get<Tool[]>("/api/tools");

    return response.data;
  }

  public async getToolTypes() {
    const response = await axios.get<Tool[]>("/api/tools/types");

    return response.data;
  }

  public async createToolType({ name }: { name: string }) {
    const response = await axios.post("/api/tools/types", { name });

    return response.data;
  }

  public async getMyTools() {
    const response = await axios.get<Tool[]>("/api/tools/me");

    return response.data;
  }

  public async createTool({
    name,
    description,
    typeId,
    storageId,
    photos,
  }: {
    name: string;
    description: string;
    typeId: string;
    storageId: string;
    photos: string[];
  }) {
    const response = await axios.post("/api/tools", {
      name,
      description,
      typeId,
      storageId,
      startDate: new Date(),
      photos,
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
      toStorageId,
    });

    return response.data;
  }

  public async deleteTool({ toolId }: { toolId: string }) {
    const response = await axios.delete(`/api/tools/${toolId}`);

    return response.data;
  }
}

const toolsService = new ToolsService();
export { toolsService };
