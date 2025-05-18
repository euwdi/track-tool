import { usersService } from "@/network/usersService";
import { CreateUser, Title, User } from "@/types/users.types";
import { AxiosError } from "axios";
import { create } from "zustand";

interface UsersState {
  users: User[];
  titles: Title[];
  getUsers: () => void;
  createUser: (user: CreateUser) => Promise<void>;
  getTitles: () => void;
  createTitle: ({ name }: { name: string }) => Promise<void>;
}

const useUsersStore = create<UsersState>()((set, get) => ({
  users: [],
  titles: [],
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
      console.error("moveTool failed", err);
      if (err instanceof AxiosError)
        throw new Error(err.response?.data.message || err.message);
    }
  },
  getTitles: async () => {
    try {
      const titles = await usersService.getTitles();
      set(() => ({ titles }));
    } catch (err) {
      console.error("getTitles failed", err);
    }
  },
  createTitle: async ({ name }: { name: string }) => {
    try {
      await usersService.createTitle({ name });
      get().getTitles();
    } catch (err) {
      console.error("getTitles failed", err);
    }
  },
}));

export { useUsersStore };
