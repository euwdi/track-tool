import { axios } from "./api";

interface StorageResponse {
  id: string;
  name: string;
  is_person: boolean;
  address: string;
}

class StorageService {
  public async getStorages(): Promise<void> {
    try {
      const response = await axios.get<StorageResponse>("/api/storages");
      console.log(response.data);
    } catch (error) {
      console.error("getStorages failed", error);
      throw error;
    }
  }
}

const storageService = new StorageService();
export { storageService };
