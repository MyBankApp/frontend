import { ChevronRight } from "lucide-react"
import styles from './Step1form.module.scss'
import { ErrorMessage, Field } from "formik"
import type { Step1formProps } from "../../types/props/Step1formProps"

const Step1form = ({ isSubmitting, touched, errors }: Step1formProps) => {
    return (
        <div className={styles.fieldGroup}>
            <div className={styles.wrapper}>
                <Field
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Введите username"
                    className={touched.username && errors.username ? styles.error : ''}
                />
                <ErrorMessage name="username" component="div" className={styles.errorText} />
            </div>

            <button
                type="submit"
                disabled={isSubmitting || !!errors.username}
                aria-label="Перейти к паролю"
            >
                <ChevronRight className={styles.arrow} />
            </button>
        </div>
    )
}

export default Step1form