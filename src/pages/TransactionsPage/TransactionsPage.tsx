import { useEffect, useState } from 'react'
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
    const [isDownloading, setIsDownloading] = useState(false)

    useEffect(() => {
        if (id === undefined) window.location.href = '/login';
    }, [id]);

    useEffect(() => {
        if (!id) return;
        TransactionsApi.getAllByUserId(id).then(data => transactionStore.setTransactions(data))
        AnalyticApi.getDataForPieChart(id).then(data => analyticStore.setDataForPieChart(data))
    }, [id]);

    const handleDownloadReport = async () => {
        if (!id) return;

        setIsDownloading(true);
        try {
            const pdfBlob = await AnalyticApi.generate_report(id);
            const url = window.URL.createObjectURL(new Blob([pdfBlob]));
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', `financial_report_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Ошибка при скачивании отчета');
        } finally {
            setIsDownloading(false);
        }
    }

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
                        <div className={styles.header}>
                            <h1>Транзакции</h1>
                            <button
                                onClick={handleDownloadReport}
                                disabled={isDownloading}
                                className={styles.downloadButton}
                            >
                                {isDownloading ? 'Скачивание...' : 'Скачать отчет (PDF)'}
                            </button>
                        </div>
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