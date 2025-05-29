import { ChevronRight } from "lucide-react"
import styles from './Step2form.module.scss'
import { ErrorMessage, Field } from "formik"
import type { Step2formProps } from "../../types/props/Step2formProps"

const Step2form = ({ touched, errors, isSubmitting, setStep }: Step2formProps) => {
    return (
        <>
            <div className={styles.fieldGroup}>
                <div className={styles.wrapper}>
                    <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Введите пароль"
                        className={touched.password && errors.password ? styles.error : ''}
                    />
                    <ErrorMessage name="password" component="div" className={styles.errorText} />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !!errors.password}
                    aria-label="Войти в систему"
                >
                    <ChevronRight className={styles.arrow} />
                </button>
            </div>

            <div className={styles.backLink}>
                <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={styles.textButton}
                >
                    Изменить логин
                </button>
            </div>
        </>
    )
}

export default Step2form