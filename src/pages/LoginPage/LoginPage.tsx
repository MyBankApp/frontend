import Layout from "../Layout"
import styles from './LoginPage.module.scss'
import { useState } from "react"
import { Form, Formik, type FormikHelpers } from "formik"
import type { LoginFormValues } from "../../types/LoginFormValues"
import { step1Schema } from "../../types/schemas/Step1Schema"
import { step2Schema } from "../../types/schemas/Step2Schema"
import Step1form from "../../components/step1form/Step1form"
import Step2form from "../../components/step2form/Step2form"
import { userStore } from "../../store/UserStore"

const LoginPage = () => {
    const [step, setStep] = useState<number>(1)

    const initialValues: LoginFormValues = {
        username: '',
        password: ''
    }

    const handleSubmit = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        if (step === 1) {
            const isValid = await actions.validateForm()
            if (isValid) setStep(2)
        } else {
            const username = values.username
            const password = values.password

            await userStore.login(username, password)
            actions.setSubmitting(false)
            
            if (userStore.isAuthenticated) window.location.href = "/profile"
        }
    }

    return (
        <Layout>
            <div className={styles.content}>
                <h2>Вход в FinBank</h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={step === 1 ? step1Schema : step2Schema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) =>
                        <Form name="login">
                            {step === 1 && <Step1form isSubmitting={isSubmitting} touched={touched} errors={errors} />}
                            {step === 2 && <Step2form isSubmitting={isSubmitting} touched={touched} errors={errors} setStep={setStep} />}
                        </Form>
                    }
                </Formik>
            </div>
        </Layout>
    )
}

export default LoginPage