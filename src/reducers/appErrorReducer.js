/** @format */
import { ErrorTypes } from "../actions/action.RequestError";

const initialState = {
	strategyLibrary: null,
	strategyLibraryPerformance: null,
};

const appErrorReducer = (state = initialState, action) => {
	switch (action.type) {
		case ErrorTypes.REQUEST_ERROR:
			return {
				...state,
				...action.error,
			};
		default:
			return state;
	}
};

export default appErrorReducer;
