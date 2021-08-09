/** @format */

export const configureStrategytypes = {
	CONFIGURE_STRATEGY: "CONFIGURE_STRATEGY",
};

export function configureUserStrategy(data) {
	// console.log("in action...", data);
	return {
		type: configureStrategytypes.CONFIGURE_STRATEGY,
		payload: data,
	};
}
