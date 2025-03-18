import { axios } from "./api";
import { Storage } from "@/types/storages.types";

class StoragesService {
  public async getStorages() {
    const response = await axios.get<Storage[]>("/api/storages");
    return response.data;
  }

  public async createStorage({
    name,
    address,
  }: {
    name: string;
    address: string;
  }) {
    const response = await axios.post("/api/storages", {
      name,
      address,
    });
    return response.data;
  }
}

const storagesService = new StoragesService();
export { storagesService };
