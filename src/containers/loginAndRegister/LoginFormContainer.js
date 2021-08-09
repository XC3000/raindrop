/** @format */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { fetchData } from "../../actions/action.auth";
import Loginform from "../../components/login/LoginForm";

function LoginFormContainer() {
	const dispatch = useDispatch();
	const handleLogin = (data) => {
		dispatch(fetchData(data));
	};
	return (
		<div>
			<Loginform handleLogin={handleLogin} />
		</div>
	);
}

export default LoginFormContainer;
