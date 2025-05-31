import { Status } from "../../enums/Status"
import { userStore } from "../../store/UserStore"
import type { TransactionType } from "../../types/TransactionType"
import styles from './Transaction.module.scss'

interface TransactionProps {
    transaction: TransactionType
}

const Transaction = ({ transaction }: TransactionProps) => {
    const {
        amount,
        status,
        createdAt,
        description,
        receiverId
    } = transaction

    const formattedDate = new Date(createdAt).toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    const getStatusStyle = () => {
        switch (status) {
            case Status.COMPLETED:
                return styles.completed
            case Status.PENDING:
                return styles.pending
            case Status.FAILED:
                return styles.failed
            default:
                return ''
        }
    }

    const isIncoming = userStore.user?.id === receiverId
    const transactionTypeIcon = isIncoming ? '↑' : '↓'
    const transactionTypeClass = isIncoming ? styles.incoming : styles.outgoing

    return (
        <div className={styles.transactionCard}>
            <div className={styles.mainContent}>
                <div className={styles.leftSection}>
                    <div className={`${styles.typeIcon} ${transactionTypeClass}`}>
                        {transactionTypeIcon}
                    </div>
                </div>

                <div className={styles.middleSection}>
                    <div className={styles.topRow}>
                        <div className={`${styles.status} ${getStatusStyle()}`}>
                            {status}
                        </div>
                    </div>

                    <div className={styles.descriptionRow}>
                        {description && (
                            <div className={styles.description}>
                                {description}
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.rightSection}>
                    <div className={styles.amount}>
                        {amount}
                    </div>
                    <div className={styles.date}>
                        {formattedDate}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transaction