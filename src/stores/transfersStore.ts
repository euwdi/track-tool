import { transfersService } from "@/network/transfersService";
import { Transfer } from "@/types/transfers.types";
import { create } from "zustand";

interface TransfersState {
  transfers: Transfer[];
  getTransfers: () => void;
  getTransfersByTool: (toolId: string, limit?: number) => void;
}

const useTransfersStore = create<TransfersState>()((set) => ({
  transfers: [],
  getTransfers: async () => {
    try {
      const transfers = await transfersService.getTransfers();
      set(() => ({ transfers }));
    } catch (err) {
      console.error("get transfers failed", err);
    }
  },
  getTransfersByTool: async (toolId: string, limit?: number) => {
    try {
      const transfers = await transfersService.getTransfersByTool(
        toolId,
        limit
      );
      set(() => ({ transfers }));
    } catch (err) {
      console.error("get transfers by tool failed", err);
    }
  },
}));

export { useTransfersStore };
