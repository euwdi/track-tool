import { storagesService } from "@/network/storagesService";
import { Storage } from "@/types/storages.types";
import { create } from "zustand";

interface StoragesState {
  storages: Storage[];
  getStorages: () => void;
  createStorage: ({ name, address }: { name: string; address: string }) => void;
}

const useStoragesStore = create<StoragesState>()((set) => ({
  storages: [],
  getStorages: async () => {
    try {
      const storages = await storagesService.getStorages();
      set(() => ({ storages }));
    } catch (err) {
      console.error("getStorages failed", err);
    }
  },
  createStorage: async ({ name, address }) => {
    try {
      await storagesService.createStorage({ name, address });

      const storages = await storagesService.getStorages();
      set(() => ({ storages }));
    } catch (err) {
      console.error("createStoragefailed", err);
    }
  },
}));

export { useStoragesStore };
