import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik"
import Layout from "../Layout"
import type { RegisterFormValues } from "../../types/formValues/RegisterFormValues"
import styles from './RegisterPage.module.scss'
import { RegisterSchema } from "../../types/schemas/RegisterSchema"
import { api } from "../../http"
import { useState } from "react"

const RegisterPage = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const initialValues: RegisterFormValues = {
        email: '',
        username: '',
        password: ''
    }

    const handleSubmit = async (values: RegisterFormValues, actions: FormikHelpers<RegisterFormValues>) => {
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const isValid = await actions.validateForm()

            if (!isValid) return

            await api.post("/auth/register", values)
            setSuccessMessage("✅ Регистрация прошла успешно! Проверьте почту для активации аккаунта")
        }

        catch (error: any) {
            const serverError = error.response?.data?.message
            const networkError = error.message;
            
            setErrorMessage(serverError || networkError)
        }

        finally {
            actions.setSubmitting(false)
        }
    }

    return (
        <Layout>
            <div className={styles.content}>
                <h2>Регистрация в FinBank</h2>

                {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
                {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

                <Formik
                    initialValues={initialValues}
                    validationSchema={RegisterSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) =>
                        <Form name="register">
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Введите email"
                                    className={touched.email && errors.email ? styles.errorField : ''}
                                />
                                <ErrorMessage name="email" component="div" className={styles.errorText} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="username">Логин</label>
                                <Field
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Введите username"
                                    className={touched.username && errors.username ? styles.errorField : ''}
                                />
                                <ErrorMessage name="username" component="div" className={styles.errorText} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="password">Пароль</label>
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Введите пароль"
                                    className={touched.password && errors.password ? styles.errorField : ''}
                                />
                                <ErrorMessage name="password" component="div" className={styles.errorText} />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={styles.submitButton}
                            >
                                {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
                            </button>
                        </Form>
                    }
                </Formik>
            </div>
        </Layout>
    )
}

export default RegisterPage