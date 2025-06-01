import { makeAutoObservable } from "mobx";
import type { DataForPieChartType } from "../types/DataForPieChartType";

class AnalyticStore {
    dataForPieChart: DataForPieChartType[] = []

    constructor() {
        makeAutoObservable(this)
    }

    public setDataForPieChart(dataForPieChart: DataForPieChartType[]) {
        this.dataForPieChart = dataForPieChart
    }

    public getDataForPieChart() {
        return this.dataForPieChart
    }
}

export const analyticStore = new AnalyticStore()