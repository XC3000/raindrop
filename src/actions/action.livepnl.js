/** @format */

export const livepnlTypes = {
	CHANGE_LIVE_PNL: "CHANGE_LIVE_PNL",
	CHANGE_LIVE_CHART_DATA: "CHANGE_LIVE_CHART_DATA",
};

export function changeLivepnl({ type, payload }) {
	// console.log("in action");
	return {
		type: type,
		payload: payload,
	};
}

export function chnageLiveChartData({ type, payload }) {
	// console.log("in action");
	return {
		type: type,
		payload: payload,
	};
}
