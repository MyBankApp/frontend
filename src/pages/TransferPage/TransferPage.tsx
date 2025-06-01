import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik'
import styles from './TransferPage.module.scss'
import { userStore } from '../../store/UserStore'
import { useEffect, useState } from 'react'
import { CategoryApi } from '../../http/CategoryApi'
import { categoryStore } from '../../store/CategoryStore'
import type { UserType } from '../../types/UserType'
import { UserApi } from '../../http/UserApi'
import { TransferApi } from '../../http/TransferApi'
import { TransferSchema } from '../../types/schemas/TransferSchema'
import type { TransferFormValues } from '../../types/formValues/TransferFormValues'

const TransferPage = () => {
    const id = userStore.user?.id
    const [users, setUsers] = useState<UserType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesData, usersData] = await Promise.all([
                    CategoryApi.getAll(),
                    UserApi.getAll()
                ])
                categoryStore.setCategories(categoriesData)
                setUsers(usersData.filter((user: UserType) => user.id !== id))
            } catch (error) {
                console.error("Ошибка загрузки данных:", error)
            }
        }

        fetchData()
    }, [id])

    const initialValues: TransferFormValues = {
        senderId: id || 0,
        receiverId: 0,
        description: '',
        amount: 0,
        categoryId: 0
    }

    const categories = categoryStore.getCategories()

    const handleSubmit = async (values: TransferFormValues, { setSubmitting, setStatus, resetForm, setErrors }: FormikHelpers<TransferFormValues>) => {
        try {
            const payload = {
                senderId: values.senderId,
                receiverId: values.receiverId,
                description: values.description || null,
                amount: Number(values.amount),
                categoryId: values.categoryId
            }

            await TransferApi.makeTransfer(payload)

            resetForm({
                values: {
                    ...initialValues,
                    senderId: id || 0
                }
            })

            setStatus("Перевод успешно выполнен!")
        }

        catch (error: any) {
            if (error.response?.data?.errors) {
                const serverErrors: Record<string, string> = {};

                Object.entries(error.response.data.errors).forEach(([key, value]) => {
                    serverErrors[key] = (value as string[]).join(', ');
                });

                setErrors(serverErrors);
            } else {
                setStatus(error.response?.data?.message || "Произошла ошибка");
            }
        }

        finally {
            setSubmitting(false);
        }
    }

    return (
        <div>
            <h1 className={styles.title}>Перевод средств</h1>
            <div className={styles.page}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={TransferSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting, errors, touched, status }) => (
                        <Form className={styles.form}>
                            <Field type="hidden" name="senderId" />

                            <div className={styles.formGroup}>
                                <label>Отправитель</label>
                                <div className={styles.senderInfo}>
                                    {userStore.user?.username}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="receiverId">Получатель</label>
                                <Field
                                    as="select"
                                    name="receiverId"
                                    className={`${styles.formControl} ${touched.receiverId && errors.receiverId ? styles.errorField : ''
                                        }`}
                                >
                                    <option value={0} disabled>Выберите получателя</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.username}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="receiverId" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="amount">Сумма</label>
                                <Field
                                    type="number"
                                    name="amount"
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0.01"
                                    className={`${styles.formControl} ${touched.amount && errors.amount ? styles.errorField : ''
                                        }`}
                                />
                                <ErrorMessage name="amount" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="categoryId">Категория</label>
                                <Field
                                    as="select"
                                    name="categoryId"
                                    className={`${styles.formControl} ${touched.categoryId && errors.categoryId ? styles.errorField : ''
                                        }`}
                                >
                                    <option value={0} disabled>Выберите категорию</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="categoryId" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="description">Описание</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    placeholder="Добавьте описание (не обязательно)"
                                    className={`${styles.formControl} ${touched.description && errors.description ? styles.errorField : ''
                                        }`}
                                />
                                <ErrorMessage name="description" component="div" className={styles.error} />
                            </div>

                            {status && <div>{status}</div>}

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Обработка...' : 'Перевести средства'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default TransferPage