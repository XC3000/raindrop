/** @format */

export const changeStrategyCardTypes = {
	CHANGE_SELECTED_STRATEGY_CARD: "CHANGE_SELECTED_STRATEGY_CARD",
};

export function changeSelectedStrategyCard(data) {
	return {
		type: changeStrategyCardTypes.CHANGE_SELECTED_STRATEGY_CARD,
		payload: data,
	};
}
