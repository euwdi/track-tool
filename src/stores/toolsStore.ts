import { toolsService } from "@/network/toolsService";
import { Tool } from "@/types/tools.types";
import { AxiosError } from "axios";
import { create } from "zustand";

interface ToolsState {
  tools: Tool[];
  myTools: Tool[];
  currentTool?: Tool;
  moveToolId: string | undefined;
  setCurrentTool: (currentTool: Tool | undefined) => void;
  setMoveToolId: (toolId: string | undefined) => void;
  getTools: () => void;
  getMyTools: () => void;
  createTool: ({
    name,
    description,
    typeId,
    storageId,
  }: {
    name: string;
    description: string;
    typeId: string;
    storageId: string;
  }) => void;
  moveTool: ({
    toolId,
    toStorageId,
  }: {
    toolId: string;
    toStorageId: string;
  }) => Promise<void>;
  deleteTool: ({ toolId }: { toolId: string }) => Promise<void>;
}

const useToolsStore = create<ToolsState>()((set, get) => ({
  tools: [],
  myTools: [],
  currentTool: undefined,
  moveToolId: undefined,
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
  createTool: async ({ name, description, typeId, storageId }) => {
    try {
      await toolsService.createTool({ name, description, typeId, storageId });

      get().getMyTools();
      get().getTools();
    } catch (err) {
      console.error("createTool failed", err);
    }
  },

  moveTool: async ({ toolId, toStorageId }) => {
    try {
      await toolsService.moveTool({ toolId, toStorageId });

      get().getMyTools();
      get().getTools();
    } catch (err) {
      console.error("moveTool failed", err);
      if (err instanceof AxiosError)
        throw new Error(err.response?.data.message || err.message);
    }
  },
  deleteTool: async ({ toolId }) => {
    try {
      await toolsService.deleteTool({ toolId });

      get().getMyTools();
      get().getTools();
    } catch (err) {
      console.error("deleteTool failed", err);
      throw err;
    }
  },
  setMoveToolId: (moveToolId) => {
    set(() => ({ moveToolId }));
  },
  setCurrentTool: (currentTool) => {
    set(() => ({ currentTool }));
  },
}));

export { useToolsStore };
