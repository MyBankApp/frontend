import * as Yup from 'yup'

export const RegisterSchema = Yup.object({
    email: Yup.string()
        .email('Некорректный email')
        .required('Обязательное поле'),
    username: Yup.string()
        .min(3, 'Минимум 3 символа')
        .required('Обязательное поле'),
    password: Yup.string()
        .min(4, 'Минимум 4 символа')
        .required('Обязательное поле')
});