/** @format */

import { API } from "../axios/instance";
import qs from "qs";
export const resetPassword = async ({ username, password }) => {
	let error = null;
	let successMsg = null;
	const response = await API.post(
		"Raindrop/userAuth.php?apicall=resetPassword",
		qs.stringify({ username, password }),
	).catch((err) => console.log("reset password error...", err));

	if (response?.data?.E) {
		error = response?.data?.M;
	} else {
		successMsg = response?.data?.M;
	}

	return { error, successMsg };
};
