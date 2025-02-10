import { axios } from "./api";
import { tokenService } from "./tokenService";

interface AuthResponse {
  token: string;
}

class AuthService {
  public async login(login: string, password: string): Promise<void> {
    try {
      const response = await axios.post<AuthResponse>("/api/auth/login", {
        login,
        password,
      });
      tokenService.setAccessToken(response.data.token);
    } catch (error) {
      console.error("Authentication failed", error);
      throw error;
    }
  }
  public logout() {
    localStorage.removeItem("token");
  }
}

const authService = new AuthService();
export { authService };
