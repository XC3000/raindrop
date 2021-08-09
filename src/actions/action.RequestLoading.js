/** @format */

export const LoadingType = {
	REQUEST_LOADING: "REQUEST_LOADING",
};

export function RequestLoading(data) {
	return {
		type: LoadingType.REQUEST_LOADING,
		payload: data,
	};
}
