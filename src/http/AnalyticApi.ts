import { analyticApi } from ".";

export class AnalyticApi {
    static async getDataForPieChart(sender_id: number) {
        const response = await analyticApi.get(`/analytic/category/${sender_id}`)
        return response.data
    }

    static async generate_report(sender_id: number) {
        const response = await analyticApi.get(`/report/${sender_id}`, { responseType: 'blob' })
        return response.data
    }
}