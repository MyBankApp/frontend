import { api } from ".";
import type { CreateTransactionType } from "../types/CreateTransactionType";
import type { UpdateTransactionType } from "../types/UpdateTransactionType";

export class TransactionsApi {
    static async getAll() {
        const response = await api.get("/transactions")
        return response.data
    }

    static async getById(id: number) {
        const response = await api.get(`/transactions/${id}`)
        return response.data
    }

    static async getAllByUserId(senderId: number) {
        const response = await api.get(`/transaction/user/${senderId}`)
        return response.data
    }

    static async create(transaction: CreateTransactionType) {
        const response = await api.post("/transactions", transaction)
        return response.data
    }

    static async update(updateTransaction: UpdateTransactionType) {
        const response = await api.put("/transactions", updateTransaction)
        return response.data
    }

    static async delete(id: number) {
        const response = await api.delete(`/transactions/${id}`)
        return response.data
    }
}