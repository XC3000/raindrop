/** @format */

import { types } from "../actions/action.RequestData";

const initialState = {
	strategyLibrary: null,
	performanceData: null,
	StrategyLibraryChart: null,
	userSubscribedStrategies: null,
};

const appDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SEND_REQUEST_SUCCESS:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

export default appDataReducer;
