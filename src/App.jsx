import { useRef } from 'react';
import './index.css';
import { sendFormData, initialState, fieldsScheme } from './checkValidation.js';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools';

export const App = () => {
	const submitButtonRef = useRef(null);

	const onConfirmPassChange = (event) => {
		const value = event.target.value;
		const password = watch('password');
		// Если пароли совпадают и нет ошибок - фокус на кнопку
		if (value === password && !errors.confirmPass && !errors.password) {
			submitButtonRef.current?.focus();
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		watch,
	} = useForm({
		defaultValues: { initialState },
		resolver: yupResolver(fieldsScheme),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const confirmPassError = errors.confirmPass?.message;

	return (
		<div className="container">
			<form onSubmit={handleSubmit(sendFormData)}>
				<p className="header">Форма регистрации</p>

				<label htmlFor="email">Email:</label>
				<input id="email" type="email" placeholder="Ваш email" {...register('email')} />
				{emailError && <div className="errormsg">{emailError}</div>}
				<label htmlFor="password">Пароль:</label>
				<input
					id="password"
					type="password"
					placeholder="Пароль"
					{...register('password')}
				/>
				{passwordError && <div className="errormsg">{passwordError}</div>}
				<label htmlFor="password2">Повторите пароль:</label>
				<input
					id="confirmPass"
					type="password"
					placeholder="Повторите пароль"
					{...register('confirmPass', { onChange: onConfirmPassChange })}
				/>
				{confirmPassError && <div className="errormsg">{confirmPassError}</div>}

				<button
					ref={submitButtonRef}
					type="submit"
					disabled={!!emailError || !!passwordError || !!confirmPassError}
				>
					Зарегистрироваться
				</button>
			</form>
			<DevTool control={control} /> {/* set up the dev tool */}
		</div>
	);
};
