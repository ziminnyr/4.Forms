import * as yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;

export const initialState = {
	email: '',
	password: '',
	confirmPass: '',
};

export const sendFormData = (formData) => {
	console.log(formData);
};

export const fieldsScheme = yup.object().shape({
	email: yup.string().required('Введите email!').matches(emailRegex, 'Неверный формат email!'),

	password: yup
		.string()
		.required('Введите пароль!')
		.min(8, 'Пароль должен быть не менее 8 символов!')
		.matches(
			passwordRegex,
			'Пароль должен состоять из строчной, заглавной буквы латинского алфавита, цифры и спецсимвола!',
		),

	confirmPass: yup
		.string()
		.required('Подтвердите пароль!')
		.oneOf(
			[yup.ref('password')], // Сравниваем с полем `password`
			'Пароли не совпадают!',
		),
});
