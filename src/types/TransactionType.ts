import { Currency } from "../enums/Currency"
import { Status } from "../enums/Status"

export type TransactionType = {
    id: string
    amount: number
    currency: typeof Currency
    status: Status
    createdAt: string
    description: string
    senderId: number
    receiverId: number
    categoryId: number
}