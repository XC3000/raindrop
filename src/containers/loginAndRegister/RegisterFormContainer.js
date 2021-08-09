/** @format */

import axios from "axios";
import qs from "qs";
import React, { useState } from "react";

import RegisterForm from "../../components/registerform/RegisterForm";

function RegisterFormContainer({ setFlag }) {
	const [error, setError] = useState(null);

	const handleRegister = async (values) => {
		console.log(values);
		const url = `https://raintech.ai/Raindrop/userAuth.php?apicall=registerUser`;
		const response = await axios
			.post(url, qs.stringify(values), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
			.catch((error) => console.log(error));

		if (response?.data?.E) {
			setError(response?.data?.M);
		} else {
			setFlag(true);
		}
	};

	return (
		<div>
			<RegisterForm
				handleRegister={handleRegister}
				error={error}
				setFlag={setFlag}
			/>
		</div>
	);
}

export default RegisterFormContainer;
