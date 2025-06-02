export type DepositType = {
    id: number
    userId: number
    amount: number
    startDate: string
    endDate: string
    product: DepositProductType
}

export type DepositProductType = {
    id: number
    name: string
    interestRate: number
    termMonths: number
    minAmount: number
    capitalization: boolean
}