/** @format */

export const changePortfolioCardTypes = {
	CHANGE_SELECTED_PORTFOLIO_CARD: "CHANGE_SELECTED_PORTFOLIO_CARD",
};

export function changeSelectedPortfolioCard(data) {
	return {
		type: changePortfolioCardTypes.CHANGE_SELECTED_PORTFOLIO_CARD,
		payload: data,
	};
}
