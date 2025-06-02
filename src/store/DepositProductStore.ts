import { makeAutoObservable } from "mobx"
import type { DepositProductType } from "../types/DepositType"

class DepositProductStore {
    depositProducts: DepositProductType[] = []

    constructor() {
        makeAutoObservable(this)
    }

    public setDepositProducts(depositProducts: DepositProductType[]) {
        this.depositProducts = depositProducts
    }

    public getDepositProducts() {
        return this.depositProducts
    }
}

export const depositProductStore = new DepositProductStore()