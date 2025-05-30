import { makeAutoObservable, runInAction } from "mobx"
import type { UserType } from "../types/UserType";
import { UserApi } from "../http/UserApi";

class UserStore {
    accessToken: string | null = null;
    refreshToken: string | null = null;
    isAuthenticated: boolean = false;
    user: UserType | null = null;

    constructor() {
        makeAutoObservable(this)
        this.loadTokens()
    }

    setTokens(access: string, refresh: string) {
        this.accessToken = access;
        this.refreshToken = refresh;
        this.isAuthenticated = !!access;

        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
    }

    async fetchUser() {
        try {
            const { data } = await UserApi.getCurrentUser()

            runInAction(() => {
                this.user = data
            })
        }

        catch (error: any) {
            console.error("Failed to fetch user", error);

            if (error.response?.status === 401) {
                this.clearTokens();
            }
        }
    }

    async login(username: string, password: string) {
        try {
            const { data } = await UserApi.login(username, password)
            this.setTokens(data.accessToken, data.refreshToken)
            await this.fetchUser()
        }

        catch (error) {
            throw error
        }
    }

    logout() {
        this.clearTokens();
        this.user = null;
    }

    loadTokens() {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.isAuthenticated = !!accessToken;

        if (!accessToken || !refreshToken) {
            this.clearTokens();
        }
    }

    clearTokens() {
        this.accessToken = null;
        this.refreshToken = null;
        this.isAuthenticated = false;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
}

export const userStore = new UserStore()