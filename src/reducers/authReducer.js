/** @format */

import { types } from "../actions/action.auth";

const rainUser = sessionStorage.getItem("rainUser")
	? JSON.parse(sessionStorage.getItem("rainUser"))
	: null;

const initialState = {
	user: rainUser,
	loading: false,
	error: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.AUTH_SEND_REQUEST:
			return {
				...state,
				loading: true,
			};
		case types.AUTH_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
				error: null,
			};
		case types.AUTH_REQUEST_ERROR:
			return {
				...state,
				user: null,
				loading: false,
				error: action.error,
			};
		case types.AUTH_LOGOUT:
			sessionStorage.removeItem("rainUser");
			return {
				...state,
				user: null,
				loading: false,
				error: null,
			};
		default:
			return state;
	}
};

export default authReducer;
