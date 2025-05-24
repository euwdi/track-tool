import { axios } from "./api";

class PhotosService {
  public async postPhoto({ photo }: { photo: File }) {
    const formData = new FormData();
    formData.append("file", photo); // Добавляем файл в FormData

    const response = await axios.post<{
      photoId: string;
    }>("/api/photos", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Указываем тип контента
      },
    });

    return response.data;
  }

  public async getPhotoById({ photoId }: { photoId: string }) {
    const response = await axios.get(`/api/photos/${photoId}`);
    return response.data;
  }

  public async deletePhotoById({ photoId }: { photoId: string }) {
    const response = await axios.delete(`/api/photos/${photoId}`);
    return response.data;
  }
}

const photosService = new PhotosService();
export { photosService };
