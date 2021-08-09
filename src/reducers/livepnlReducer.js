/** @format */

import { livepnlTypes } from "../actions/action.livepnl";

const initialState = {
	newunrealizedpnl: null,
	dailypnl: null,
	dailyPercntChange: Math.floor(Math.random() * 100),
	// liveChartData: null,
};

const livepnlReducer = (state = initialState, action) => {
	switch (action.type) {
		case livepnlTypes.CHANGE_LIVE_PNL:
			// console.log(action);
			return {
				...state,
				...action.payload,
			};
		case livepnlTypes.CHANGE_LIVE_CHART_DATA:
			return {
				...state,
				["liveChartData"]: action.payload,
			};
		default:
			return state;
	}
};

export default livepnlReducer;
