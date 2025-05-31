import type {transactionStore } from "../store/TransactionsStore"
import { userStore } from "../store/UserStore"

export interface StoresType {
    userStore: typeof userStore
    transactionStore: typeof transactionStore
}