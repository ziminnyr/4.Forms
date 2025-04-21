import { useState } from 'react';

export const sendFormData = (formData) => {
	console.log(formData);
};

const initialState = {
	email: '',
	password: '',
	confirmPass: '',
};

export const useStore = () => {
	const [formData, setFormData] = useState(initialState);

	return {
		getState: () => formData,
		updateState: (fieldName, newValue) => {
			setFormData({ ...formData, [fieldName]: newValue });
		},
	};
};
