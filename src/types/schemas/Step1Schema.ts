import * as Yup from 'yup'

export const step1Schema = Yup.object({
    username: Yup.string()
        .required('Обязательное поле')
});