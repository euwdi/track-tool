import { Tool } from "@/types/tools.types";
import { axios } from "./api";

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
}

const toolsService = new ToolsService();
export { toolsService };
