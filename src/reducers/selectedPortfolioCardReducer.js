/** @format */

import { changePortfolioCardTypes } from "../actions/action.changeSelectedPortfolioCard";

const initialState = null;

const selectedPortfolioCard = (state = initialState, action) => {
	switch (action.type) {
		case changePortfolioCardTypes.CHANGE_SELECTED_PORTFOLIO_CARD:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

export default selectedPortfolioCard;
