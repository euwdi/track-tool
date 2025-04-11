import { axios } from "./api";
import { Transfer } from "@/types/transfers.types";

class TransfersService {
  public async getTransfers() {
    const response = await axios.get<Transfer[]>("/api/transfers");

    return response.data;
  }

  public async getTransfersByTool(toolId: string, limit?: number) {
    const response = await axios.get<Transfer[]>(
      `/api/tools/${toolId}/transfers?limit=${limit}`
    );

    return response.data;
  }
}

const transfersService = new TransfersService();
export { transfersService };
