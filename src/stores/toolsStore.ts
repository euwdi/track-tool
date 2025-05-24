import { toolsService } from "@/network/toolsService";
import { Tool, ToolType } from "@/types/tools.types";
import { AxiosError } from "axios";
import { create } from "zustand";

interface ToolsState {
  tools: Tool[];
  types: ToolType[];
  myTools: Tool[];
  currentTool?: Tool;
  moveToolId: string | undefined;
  setCurrentTool: (currentTool: Tool | undefined) => void;
  setMoveToolId: (toolId: string | undefined) => void;
  getTools: () => void;
  getToolTypes: () => void;
  createToolType: ({ name }: { name: string }) => void;
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
    photos: string[];
  }) => Promise<void>;
  moveTool: ({
    toolId,
    storageId,
  }: {
    toolId: string;
    storageId: string;
  }) => Promise<void>;
  deleteTool: ({ toolId }: { toolId: string }) => Promise<void>;
}

const useToolsStore = create<ToolsState>()((set, get) => ({
  tools: [],
  types: [],
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
  getToolTypes: async () => {
    try {
      const types = await toolsService.getToolTypes();
      set(() => ({ types }));
    } catch (err) {
      console.error("getToolTypes failed", err);
      if (err instanceof AxiosError)
        throw new Error(err.response?.data.message || err.message);
    }
  },
  createToolType: async ({ name }: { name: string }) => {
    try {
      await toolsService.createToolType({ name });
      get().getToolTypes();
    } catch (err) {
      console.error("createToolTypes failed", err);
      if (err instanceof AxiosError)
        throw new Error(err.response?.data.message || err.message);
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
  createTool: async ({ name, description, typeId, storageId, photos }) => {
    try {
      await toolsService.createTool({ name, description, typeId, storageId, photos });

      get().getMyTools();
      get().getTools();
    } catch (err) {
      console.error("moveTool failed", err);
      if (err instanceof AxiosError)
        throw new Error(err.response?.data.message || err.message);
    }
  },

  moveTool: async ({ toolId, storageId }) => {
    try {
      await toolsService.moveTool({ toolId, storageId });

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
