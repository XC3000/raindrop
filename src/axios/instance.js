/** @format */

import axios from "axios";
import store from "../store";

function getJWT() {
	let user = sessionStorage.getItem("rainUser")
		? JSON.parse(sessionStorage.getItem("rainUser"))
		: "";
	console.log(user?.jwt);
	return user?.jwt;
}

// let user = sessionStorage.getItem("rainUser")
// 	? JSON.parse(sessionStorage.getItem("rainUser"))
// 	: "";

// console.log(user);

export const API = axios.create({
	baseURL: "https://raintech.ai/",
	timeout: 10000,
	"Content-Type": "application/x-www-form-urlencoded",
});

API.interceptors.request.use(
	(config) => {
		const state = store.getState();
		let jwt = state?.authReducer?.user?.jwt;
		if (jwt) {
			config.headers.Authorization = `Bearer ${jwt}`;
		} else {
			delete API.defaults.headers.common.Authorization;
		}
		return config;
	},

	(error) => Promise.reject(error),
);
