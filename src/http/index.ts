import axios from "axios";
import { userStore } from '../store/UserStore'

export const api = axios.create({
    baseURL: "http://localhost:8080/api/"
})

export const analyticApi = axios.create({
    baseURL: "http://localhost:8000/api/",
})

api.interceptors.request.use(config => {
    if (userStore.accessToken) {
        config.headers.Authorization = `Bearer ${userStore.accessToken}`
    }

    return config
})

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config

        if (error.response?.status === 401 && originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await api.post("/auth/refresh", {
                    refreshToken: userStore.refreshToken
                })

                userStore.setTokens(data.accessToken, data.refreshToken)
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`

                return axios(originalRequest)
            }

            catch (refreshError) {
                userStore.clearTokens()
                window.location.href = "/login"

                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error);
    }

)