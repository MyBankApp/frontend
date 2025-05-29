import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik"
import Layout from "../Layout"
import type { RegisterFormValues } from "../../types/RegisterFormValues"
import styles from './RegisterPage.module.scss'
import { RegisterSchema } from "../../types/schemas/RegisterSchema"

const RegisterPage = () => {

    const initialValues: RegisterFormValues = {
        email: '',
        username: '',
        password: ''
    }

    const handleSubmit = async (values: RegisterFormValues, actions: FormikHelpers<RegisterFormValues>) => {
        const isValid = await actions.validateForm()

        if (isValid) {
            console.log(values)
            actions.setSubmitting(false)
        }
    }

    return (
        <Layout>
            <div className={styles.content}>
                <h2>Регистрация в FinBank</h2>

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