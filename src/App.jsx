import { useRef, useState } from 'react';
import './index.css';
import { useStore } from './useStore.js';
import { useValidation } from './checkValidation.js';

export const App = () => {
	const { getState, updateState } = useStore();
	const [formError, setFormError] = useState('');

	const submitButtonRef = useRef(null);

	const { email, password, confirmPass } = getState();

	const { onChange, onEmailBlur, onPassBlur, onConfirmPassChange, onConfirmPassBlur, onSubmit } =
		useValidation({ updateState, setFormError, submitButtonRef, password, getState });

	return (
		<div className="container">
			<form onSubmit={onSubmit}>
				<p className="header">Форма регистрации</p>

				<label htmlFor="email">Email:</label>
				<input
					id="email"
					name="email"
					type="email"
					placeholder="Ваш email"
					value={email}
					onChange={onChange}
					onBlur={onEmailBlur}
				/>
				<label htmlFor="password">Пароль:</label>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={onChange}
					onBlur={onPassBlur}
				/>
				<label htmlFor="password2">Повторите пароль:</label>
				<input
					id="confirmPass"
					name="confirmPass"
					type="password"
					placeholder="Повторите пароль"
					value={confirmPass}
					onChange={onConfirmPassChange}
					onBlur={onConfirmPassBlur}
				/>

				{formError && <div className="errormsg">{formError}</div>}
				<button ref={submitButtonRef} type="submit" disabled={!!formError}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
