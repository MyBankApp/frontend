import type { analyticStore } from "../store/AnalyticStore"
import type { categoryStore } from "../store/CategoryStore"
import type { depositProductStore } from "../store/DepositProductStore"
import type {transactionStore } from "../store/TransactionsStore"
import { userStore } from "../store/UserStore"

export interface StoresType {
    userStore: typeof userStore
    transactionStore: typeof transactionStore
    analyticStore: typeof analyticStore
    categoryStore: typeof categoryStore
    depositProductStore: typeof depositProductStore
}