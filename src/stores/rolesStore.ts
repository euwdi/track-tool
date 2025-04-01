import { rolesService } from "@/network/rolesService";
import { Role } from "@/types/roles.types";
import { create } from "zustand";

interface RolesState {
  roles: Role[];
  getRoles: () => void;
}

const useRolesStore = create<RolesState>()((set) => ({
  roles: [],
  getRoles: async () => {
    try {
      const roles = await rolesService.getRoles();
      set(() => ({ roles }));
    } catch (err) {
      console.error("get roles failed", err);
    }
  },
}));

export { useRolesStore };
