import { toolsService } from "@/network/toolsService";
import { Tool } from "@/types/tools.types";
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
  }) => void;
}

const useToolsStore = create<ToolsState>()((set) => ({
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

      const myTools = await toolsService.getMyTools();
      const tools = await toolsService.getTools();
      set(() => ({ tools, myTools }));
    } catch (err) {
      console.error("createTool failed", err);
    }
  },

  moveTool: async ({ toolId, toStorageId }) => {
    try {
      await toolsService.moveTool({ toolId, toStorageId });

      const myTools = await toolsService.getMyTools();
      const tools = await toolsService.getTools();
      set(() => ({ tools, myTools }));
    } catch (err) {
      console.error("moveTool failed", err);
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
