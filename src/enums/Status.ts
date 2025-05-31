export const Status = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
} as const;

export type Status = typeof Status[keyof typeof Status];