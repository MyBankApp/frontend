import { api } from ".";
import type { TransferType } from "../types/TransferType";

export class TransferApi {
    static async makeTransfer(transfer: TransferType) {
        const response = await api.post('/users', transfer)
        return response.data
    }   
}