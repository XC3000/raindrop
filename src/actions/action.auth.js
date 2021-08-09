/** @format */

export const types = {
	AUTH_SEND_REQUEST: "AUTH_SEND_REQUEST",
	AUTH_REQUEST_SUCCESS: "AUTH_REQUEST_SUCCESS",
	AUTH_REQUEST_ERROR: "AUTH_REQUEST_ERROR",
	AUTH_LOGOUT: "AUTH_LOGOUT",
};

export function fetchData(data) {
	return {
		type: types.AUTH_SEND_REQUEST,
		payload: data,
	};
}

export function fetchDataSuccess(user) {
	// console.log("fetch auth success", JSON.stringify(user));
	sessionStorage.setItem("rainUser", JSON.stringify(user));
	return {
		type: types.AUTH_REQUEST_SUCCESS,
		payload: user,
	};
}

export function fetchDataError(error) {
	return {
		type: types.AUTH_REQUEST_ERROR,
		payload: {},
		error: error,
	};
}

export function logout() {
	return {
		type: types.AUTH_LOGOUT,
	};
}
