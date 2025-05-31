import { useEffect } from 'react'
import { userStore } from '../../store/UserStore'
import styles from './TransactionsPage.module.scss'
import { TransactionsApi } from '../../http/TransactionsApi'
import { transactionStore } from '../../store/TransactionsStore'
import Transaction from '../../components/transactions/Transaction'
import { observer } from 'mobx-react-lite'

const TransactionsPage = () => {
    const id = userStore.user?.id

    useEffect(() => {
        if (id === undefined) window.location.href = '/login';
    }, [id]);

    useEffect(() => {
        if (!id) return;
        TransactionsApi.getAllByUserId(id).then(data => transactionStore.setTransactions(data))
    }, [id]);

    const transactions = transactionStore.getTransactions()
     
    return (
        <div className={styles.page}>
            {
                transactions === undefined
                ? 
                <div>Транзакций нет</div> 
                : 
                <div>
                    <h1 className={styles.text}>Транзакции</h1>
                    {transactions.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />)}
                </div>
            }
        </div>
    )
}

export default observer(TransactionsPage)