import { makeAutoObservable } from "mobx";
import type { TransactionType } from "../types/TransactionType";

class TransactionsStore {
    transactions: TransactionType[] = []

    constructor() {
        makeAutoObservable(this)
    }

    public setTransactions(transactions: TransactionType[]) {
        this.transactions = transactions
    }

    public getTransactions() {
        return this.transactions
    }
}

export const transactionStore = new TransactionsStore()