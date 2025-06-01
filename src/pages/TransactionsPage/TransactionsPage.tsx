import { useEffect } from 'react'
import { userStore } from '../../store/UserStore'
import styles from './TransactionsPage.module.scss'
import { TransactionsApi } from '../../http/TransactionsApi'
import { transactionStore } from '../../store/TransactionsStore'
import Transaction from '../../components/transactions/Transaction'
import { observer } from 'mobx-react-lite'
import { AnalyticApi } from '../../http/AnalyticApi'
import { analyticStore } from '../../store/AnalyticStore'
import { PieChart } from '@mui/x-charts'

const TransactionsPage = () => {
    const id = userStore.user?.id

    useEffect(() => {
        if (id === undefined) window.location.href = '/login';
    }, [id]);

    useEffect(() => {
        if (!id) return;
        TransactionsApi.getAllByUserId(id).then(data => transactionStore.setTransactions(data))
        AnalyticApi.getDataForPieChart(id).then(data => analyticStore.setDataForPieChart(data))
    }, [id]);

    const transactions = transactionStore.getTransactions()
    const dataForPieChart = analyticStore.getDataForPieChart()
     
    return (
        <div className={styles.page}>
            {
                transactions === undefined
                ? 
                <div>Транзакций нет</div> 
                : 
                <div>
                    <h1 className={styles.text}>Транзакции</h1>
                    <div className={styles.charts}>
                        <PieChart series={[{ data: dataForPieChart }]} />
                    </div>
                    {transactions.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />)}
                </div>
            }
        </div>
    )
}

export default observer(TransactionsPage)