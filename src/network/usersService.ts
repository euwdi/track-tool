import { CreateUser, User } from "@/types/users.types";
import { axios } from "./api";

class UsersService {
  public async getUsers() {
    const response = await axios.get<User[]>("/api/users");

    return response.data;
  }

  public async getMyUser() {
    const response = await axios.get<User>("/api/users/me");

    return response.data;
  }

  public async createUser(user: CreateUser) {
    const response = await axios.post("/api/users", {
      ...user,
    });

    return response.data;
  }

  public async getTitles() {
    const response = await axios.get("/api/titles");

    return response.data;
  }

  public async createTitle({ name }: { name: string }) {
    const response = await axios.post("/api/titles", {
      name,
    });

    return response.data;
  }
}

const usersService = new UsersService();
export { usersService };
