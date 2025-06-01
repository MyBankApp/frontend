import type { FormikErrors, FormikTouched } from "formik"
import type { LoginFormValues } from "../formValues/LoginFormValues"

export interface Step1formProps {
    isSubmitting: boolean
    touched: FormikTouched<LoginFormValues>
    errors: FormikErrors<LoginFormValues>
}