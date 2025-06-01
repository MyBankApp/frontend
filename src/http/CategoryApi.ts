import { api } from ".";
import type { CreateCategoryType } from "../types/CreateCategoryType";
import type { UpdateCategoryType } from "../types/UpdateCategoryType";

export class CategoryApi {
    static async getAll() {
        const response = await api.get("/category")
        return response.data
    }

    static async getById(id: number) {
        const response = await api.get(`/category/${id}`)
        return response.data
    }

    static async create(category: CreateCategoryType) {
        const response = await api.post("/category", category)
        return response.data
    }

    static async update(category: UpdateCategoryType) {
        const response = await api.put("/category", category)
        return response.data
    }

    static async delete(id: number) {
        const response = await api.delete(`/category/${id}`)
        return response.data
    }
}