export const Currency = {
    RUB: 'RUB',
    EUR: 'EUR',
    USD: 'USD'
} as const

export type Currency = typeof Currency[keyof typeof Currency]