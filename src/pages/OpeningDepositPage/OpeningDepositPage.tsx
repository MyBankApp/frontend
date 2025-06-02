import { useEffect } from "react"
import { userStore } from "../../store/UserStore"
import styles from './OpeningDepositPage.module.scss'
import { DepositApi } from "../../http/DepositApi"
import { depositProductStore } from "../../store/DepositProductStore"
import * as Yup from "yup";
import type { DepositRequest } from "../../types/request/DepositRequest"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { observer } from "mobx-react-lite"
import { UserApi } from "../../http/UserApi"

const depositSchema = Yup.object().shape({
    productId: Yup.number()
        .required('Выберите депозитный продукт')
        .min(1, 'Выберите депозитный продукт'),
    amount: Yup.number()
        .required('Введите сумму')
        .positive('Сумма должна быть положительной')
        .min(1, 'Минимальная сумма - 1'),
});

const OpeningDepositPage = () => {
    const userId = userStore.user?.id

    useEffect(() => {
        DepositApi.getAll().then(data => depositProductStore.setDepositProducts(data))
    }, [userId])

    const depositProducts = depositProductStore.getDepositProducts();

    const handleSubmit = async (values: DepositRequest, { setSubmitting, resetForm }: any) => {
        try {
            if (!userId || !userStore.user) {
                alert('Пользователь не авторизован');
                return;
            }

            if (userStore.user.balance < values.amount) {
                alert('Недостаточно средств на балансе');
                setSubmitting(false);
                return;
            }

            await DepositApi.open({
                ...values,
                userId: userId,
            });

            alert('Депозит успешно открыт!');

            const newBalance = userStore.user.balance - values.amount;

            const updateDto = {
                id: userId,
                username: userStore.user.username || '',
                email: userStore.user.email || '',
                balance: newBalance,
            };

            await UserApi.update(updateDto);
            
            userStore.user = { ...userStore.user, balance: newBalance };

            resetForm();
        } catch (error) {
            console.error('Ошибка открытия депозита:', error);
            alert('Произошла ошибка при открытии депозита');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>Открытие депозита</h1>

                <Formik
                    initialValues={{ productId: 0, amount: 0, userId: 0 }}
                    validationSchema={depositSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="productId">Депозитный продукт</label>
                                <Field
                                    as="select"
                                    name="productId"
                                    className={styles.select}
                                >
                                    <option value={0}>Выберите продукт</option>
                                    {depositProducts.map(product => (
                                        <option key={product.id} value={product.id}>
                                            {product.name} ({product.interestRate}%)
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="productId" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="amount">Сумма вклада</label>
                                <Field
                                    type="number"
                                    name="amount"
                                    className={styles.input}
                                    min="1"
                                />
                                <ErrorMessage name="amount" component="div" className={styles.error} />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={styles.submitButton}
                            >
                                {isSubmitting ? 'Обработка...' : 'Открыть депозит'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default observer(OpeningDepositPage)