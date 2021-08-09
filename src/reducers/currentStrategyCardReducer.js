/** @format */

import { changeStrategyCardTypes } from "../actions/action.changeCurrentStrategyCard";

const initialState = null;

const CurrentStrategyCardReducer = (state = initialState, action) => {
	switch (action.type) {
		case changeStrategyCardTypes.CHANGE_SELECTED_STRATEGY_CARD:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

export default CurrentStrategyCardReducer;
