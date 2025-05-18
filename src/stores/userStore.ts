import { authService } from "@/network/authService";
import { tokenService } from "@/network/tokenService";
import { usersService } from "@/network/usersService";
import { User } from "@/types/users.types";
import { AxiosError } from "axios";
import { create } from "zustand";

interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  profile: User;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
  getProfile: () => void;
}

const useUserStore = create<UserState>()((set) => ({
  isAuth: false,
  isLoading: false,
  login: async (login: string, password: string) => {
    set(() => ({ isLoading: true }));

    try {
      const { accessToken, refreshToken } = await authService.login(
        login,
        password
      );
      tokenService.setAccessToken(accessToken);
      tokenService.setRefreshToken(refreshToken);

      const profile = await usersService.getMyUser();

      set(() => ({ isAuth: true, profile, isLoading: false }));
    } catch (err) {
      console.error("moveTool failed", err);
      set(() => ({ isLoading: false }));
      if (err instanceof AxiosError)
        throw new Error(err.response?.data.message || err.message);
    }
  },
  logout: () => {
    set(() => ({ isAuth: false }));
    tokenService.clear();
  },
  getProfile: async () => {
    try {
      const profile = await usersService.getMyUser();
      set(() => ({ profile, isAuth: true }));
    } catch (err) {
      console.error("getProfile failed", err);
    }
  },
  profile: {} as User,
}));

export { useUserStore };
