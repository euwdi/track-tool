import axiosModule from "axios";
import { tokenService } from "./tokenService";
import { useUserStore } from "@/stores/userStore";

const URL = import.meta.env.VITE_API_URL;

const axios = axiosModule.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers!["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Проверяем, что ошибка связана с истекшим access токеном
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        tokenService.clearAccessToken();

        // Получаем новый access токен с помощью refresh токена
        const response = await axios.post("/api/auth/refresh", {
          refresh_token: tokenService.getRefreshToken(),
        });

        // Сохраняем новый access токен
        const { access_token: accessToken, refresh_token: refreshToken } =
          response.data;

        tokenService.setAccessToken(accessToken);
        tokenService.setRefreshToken(refreshToken);

        // Повторяем оригинальный запрос с новым access токеном
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Если обновление токена не удалось, перенаправляем на страницу входа
        useUserStore().logout();
        console.log("Access token");
        

        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { axios };
