import { api } from ".";
import type { GetDepositRequest } from "../types/request/GetDepositRequest";
import type { DepositRequest } from '../types/request/DepositRequest'

export class DepositApi {
    static async getByUserId(GetDepositRequest: GetDepositRequest) {
        const response = await api.post("/deposits", GetDepositRequest)
        return response.data
    }

    static async getAll() {
        const response = await api.get("/deposits")
        return response.data
    }

    static async open(DepositRequest: DepositRequest) {
        const response = await api.post("/deposits/open", DepositRequest)
        return response.data
    }

    static async getInterest(id: number) {
        const response = await api.get(`/deposits/interest/${id}`)
        return response.data
    }
}