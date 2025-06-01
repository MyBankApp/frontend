import { makeAutoObservable } from "mobx";
import type { CategoryType } from "../types/CategoryType";

class CategoryStore {
    categories: CategoryType[] = []

    constructor() {
        makeAutoObservable(this)
    }

    public setCategories(categories: CategoryType[]) {
        this.categories = categories
    }

    public getCategories() {
        return this.categories
    }
}

export const categoryStore = new CategoryStore()