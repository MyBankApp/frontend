import { api } from ".";
import type { AuthResponse } from "../types/response/AuthResponse";
import type { UserType } from "../types/UserType";

export class UserApi {
    static async login(username: string, password: string) {
        return await api.post<AuthResponse>("/auth/login", { username, password })
    }

    static async register(username: string, email: string, password: string) {
        return await api.post("/auth/register", { username, email, password })
    }

    static async logout() {
        api.post("/auth/logout")
    }

    static async getCurrentUser() {
        return api.get<UserType>("/auth/me")
    }
}