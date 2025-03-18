import { authService } from "@/network/authService";
import { tokenService } from "@/network/tokenService";
import { create } from "zustand";

interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  login: (login: string, password: string) => void;
  logout: () => void;
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
      set(() => ({ isAuth: true }));
      tokenService.setAccessToken(accessToken);
      tokenService.setRefreshToken(refreshToken);
    } catch (err) {
      console.error("Authentication failed", err);
      set(() => ({ isLoading: false }));
    }
  },
  logout: () => {
    set(() => ({ isAuth: false }));
    tokenService.clear();
  },
}));

export { useUserStore };
