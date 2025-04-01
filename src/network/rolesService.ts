import { Role } from "@/types/roles.types";
import { axios } from "./api";

class RolesService {
  public async getRoles() {
    const response = await axios.get<Role[]>("/api/roles");
    console.log(response.data);

    return response.data;
  }
}

const rolesService = new RolesService();
export { rolesService };
