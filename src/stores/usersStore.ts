import { usersService } from "@/network/usersService";
import { CreateUser, User } from "@/types/users.types";
import { create } from "zustand";

interface UsersState {
  users: User[];
  getUsers: () => void;
  createUser: (user: CreateUser) => void;
}

const useUsersStore = create<UsersState>()((set) => ({
  users: [],
  getUsers: async () => {
    try {
      const users = await usersService.getUsers();
      set(() => ({ users }));
    } catch (err) {
      console.error("get tools failed", err);
    }
  },
  createUser: async (user: CreateUser) => {
    try {
      await usersService.createUser(user);
      const users = await usersService.getUsers();
      set(() => ({ users }));
    } catch (err) {
      console.error("createStoragefailed", err);
    }
  },
}));

export { useUsersStore };
