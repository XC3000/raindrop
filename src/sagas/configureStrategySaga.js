/** @format */

import { call, put, takeEvery } from "@redux-saga/core/effects";
import { fetchDataError } from "../actions/action.RequestError";
import { RequestLoading } from "../actions/action.RequestLoading";
import { configureStrategytypes } from "../actions/action.configureStrategy";
import { API } from "../axios/instance";
import qs from "qs";
import { fetchData } from "../actions/action.RequestData";

function* asyncConfigureStrategy(action) {
	try {
		yield put(RequestLoading({ subscribeToStrategy: true }));
		let response = yield call(
			async () =>
				await API.post(
					"Raindrop/raintech.php?apicall=configureStrategy",
					qs.stringify(action.payload),
				),
		);
		console.log(response);
		if (response?.data?.Data?.E) {
			yield put(
				fetchDataError({ subscribeToStrategy: response?.data?.Data?.M }),
			);
			yield put(RequestLoading({ subscribeToStrategy: false }));
		} else {
			yield put(
				fetchData({
					type: "SEND_USER_SUBSCRIBED_STRATEGIES_REQUEST",
					payload: "strategy",
				}),
			);
			yield put(RequestLoading({ subscribeToStrategy: false }));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchConfigureStrategySaga() {
	yield takeEvery(
		configureStrategytypes.CONFIGURE_STRATEGY,
		asyncConfigureStrategy,
	);
}
