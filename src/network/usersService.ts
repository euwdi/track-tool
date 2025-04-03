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
}

const usersService = new UsersService();
export { usersService };
