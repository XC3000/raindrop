/** @format */

import { LoadingType } from "../actions/action.RequestLoading";

const initialState = {
	strategyLibrary: false,
	strategyLibraryPerformance: false,
};

const appDataLoadingReducer = (state = initialState, action) => {
	switch (action.type) {
		case LoadingType.REQUEST_LOADING:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

export default appDataLoadingReducer;
