import { Currency } from "../enums/Currency";
import { Status } from "../enums/Status";

export type UpdateTransactionType = {
    id: string
    amount: number
    currency: typeof Currency
    status: typeof Status
    description: string
    senderId: number
    receiverId: number
    categoryId: number
}