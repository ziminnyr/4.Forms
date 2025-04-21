import { sendFormData } from './useStore';

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;

export const useValidation = ({
	updateState,
	setFormError,
	submitButtonRef,
	password,
	getState,
}) => {
	const onChange = ({ target }) => updateState(target.name, target.value);

	const onEmailBlur = ({ target }) => {
		!emailRegex.test(target.value)
			? setFormError(
					`Неверный email адрес. Проверьте логин перед символом @ и домен почтового ящика!`,
				)
			: setFormError('');
	};

	const onPassBlur = ({ target }) => {
		!passwordRegex.test(target.value)
			? setFormError(
					'Пароль должен быть не менее 8 символов, состоять из строчной, заглавной буквы латинского алфавита, цифры и спецсимвола!',
				)
			: setFormError('');
	};

	const onConfirmPassChange = ({ target }) => {
		setFormError('');
		updateState(target.name, target.value);
		if (target.value === password) {
			submitButtonRef.current.focus();
		}
	};

	const onConfirmPassBlur = ({ target }) => {
		password !== target.value ? setFormError(`Пароли не совпадают!`) : setFormError('');
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(getState());
	};

	return { onChange, onEmailBlur, onPassBlur, onConfirmPassChange, onConfirmPassBlur, onSubmit };
};
