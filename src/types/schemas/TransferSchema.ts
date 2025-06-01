import * as Yup from 'yup'

export const TransferSchema = Yup.object({
    receiverId: Yup.number()
        .nonNullable()
        .positive("Выберите получателя")
        .required("Выберите получателя"),
    description: Yup.string()
        .max(140, "Описание не должно превышать 140 символов"),
    amount: Yup.number()
        .nonNullable()
        .positive("Сумма должна быть положительной")
        .required("Введите сумму перевода"),
    categoryId: Yup.number()
        .nonNullable()
        .positive("Выберите категорию")
        .required("Выберите категорию")
})