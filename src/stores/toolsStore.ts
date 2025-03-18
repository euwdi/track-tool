import { toolsService } from "@/network/toolsService";
import { Tool } from "@/types/tools.types";
import { create } from "zustand";

interface ToolsState {
  tools: Tool[];
  myTools: Tool[];
  getTools: () => void;
  getMyTools: () => void;
}

const useToolsStore = create<ToolsState>()((set) => ({
  tools: [],
  myTools: [],
  getTools: async () => {
    try {
      const tools = await toolsService.getTools();
      set(() => ({ tools }));
    } catch (err) {
      console.error("get tools failed", err);
    }
  },
  getMyTools: async () => {
    try {
      const myTools = await toolsService.getMyTools();
      set(() => ({ myTools }));
    } catch (err) {
      console.error("get tools failed", err);
    }
  },
}));

export { useToolsStore };
