import { axios } from "./api";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  public async login(login: string, password: string) {
    const response = await axios.post<AuthResponse>("/api/auth/login", {
      login,
      password,
    });
    return response.data;
  }
  public logout() {
    localStorage.removeItem("token");
  }
}

const authService = new AuthService();
export { authService };
