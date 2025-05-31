import { api } from ".";
import type { CreateTransactionType } from "../types/CreateTransactionType";
import type { UpdateTransactionType } from "../types/UpdateTransactionType";

export class TransactionsApi {
    static async getAll() {
        return await api.get("/transactions")
    }

    static async getById(id: number) {
        return await api.get(`/transactions/${id}`)
    }

    static async getAllByUserId(senderId: number) {
        const response = await api.get(`/transaction/user/${senderId}`)
        return response.data
    }

    static async create(transaction: CreateTransactionType) {
        return await api.post("/transactions", transaction)
    }

    static async update(updateTransaction: UpdateTransactionType) {
        return await api.put("/transactions", updateTransaction)
    }

    static async delete(id: number) {
        return await api.delete(`/transactions/${id}`)
    }
}