import * as Yup from 'yup'

export const step2Schema = Yup.object({
    username: Yup.string()
        .required('Обязательное поле'),
    password: Yup.string()
        .required('Пароль обязателен')
        .min(4, 'Пароль должен быть не менее 4 символов')
});