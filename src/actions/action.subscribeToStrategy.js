/** @format */

export const subscribeToStrategytypes = {
	SUBSCRIBE_TO_STRATEGY: "SUBSCRIBE_TO_STRATEGY",
};

export function subscribeToStrategy(data) {
	console.log("in action...", data);
	return {
		type: subscribeToStrategytypes.SUBSCRIBE_TO_STRATEGY,
		payload: data,
	};
}
