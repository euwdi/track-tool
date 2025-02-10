import { axios } from "./api";

interface ToolsResponse {
  id: string;
  description: string;
  is_canceled: boolean;
  name: string;
  register_date: Date;
  start_date: string;
  storage_id: string;
  type_id: string;
}

class ToolsService {
  public async getTools(): Promise<void> {
    try {
      const response = await axios.get<ToolsResponse[]>("/api/tools");
      console.log(response.data);
    } catch (error) {
      console.error("getTools failed", error);
      throw error;
    }
  }
}

const toolsService = new ToolsService();
export { toolsService };
