import { useEffect, useState } from 'react'
import { userStore } from '../../store/UserStore'
import styles from './DepositPage.module.scss'
import { DepositApi } from '../../http/DepositApi'
import type { DepositType } from '../../types/DepositType'
import { Link } from 'react-router-dom'

const DepositPage = () => {
    const userId = userStore.user?.id
    console.log(userId);
    
    const [deposit, setDeposit] = useState<DepositType | null>(null)

    if (userId === undefined) {
        return <div className={styles.notAuth}>Вы не авторизованы</div>
    }

    useEffect(() => {
        DepositApi.getByUserId({ userId }).then(data => setDeposit(data))
    }, [userId])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU')
    }

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                {deposit ? (
                    <div className={styles.depositCard}>
                        <h2 className={styles.title}>Ваш депозит</h2>

                        <div className={styles.productInfo}>
                            <div className={styles.productName}>{deposit.product.name}</div>
                            <div className={styles.interestRate}>
                                Ставка: {deposit.product.interestRate}%
                            </div>
                        </div>

                        <div className={styles.amountContainer}>
                            <div className={styles.amountLabel}>Сумма на счете</div>
                            <div className={styles.amount}>
                                {deposit.amount.toLocaleString('ru-RU')} ₽
                            </div>
                        </div>

                        <div className={styles.dates}>
                            <div className={styles.dateItem}>
                                <span>Открыт:</span>
                                <span>{formatDate(deposit.startDate)}</span>
                            </div>
                            <div className={styles.dateItem}>
                                <span>Закрытие:</span>
                                <span>{formatDate(deposit.endDate)}</span>
                            </div>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.detailItem}>
                                <span>Срок:</span>
                                <span>{deposit.product.termMonths} мес.</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span>Капитализация:</span>
                                <span>{deposit.product.capitalization ? 'Да' : 'Нет'}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.noDeposit}>
                        <h3>У вас нет активных депозитов</h3>
                        <p>Откройте новый депозит по <Link to={"/open-deposit"}>ссылке</Link></p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DepositPage