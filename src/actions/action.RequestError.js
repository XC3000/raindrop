/** @format */

export const ErrorTypes = {
	REQUEST_ERROR: "REQUEST_ERROR",
};

export function fetchDataError(error) {
	return {
		type: ErrorTypes.REQUEST_ERROR,
		error: error,
	};
}
