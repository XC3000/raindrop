/** @format */

import { call, put, takeEvery } from "@redux-saga/core/effects";
import { fetchDataError } from "../actions/action.RequestError";
import { RequestLoading } from "../actions/action.RequestLoading";
import { subscribeToStrategytypes } from "../actions/action.subscribeToStrategy";
import { API } from "../axios/instance";
import qs from "qs";

function* asyncSubscribeToStrategy(action) {
	try {
		yield put(RequestLoading({ subscribeToStrategy: true }));
		let response = yield call(
			async () =>
				await API.post(
					"Raindrop/raintech.php?apicall=addStrategy",
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
			yield put(RequestLoading({ subscribeToStrategy: false }));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchSubscribeToStrategySaga() {
	yield takeEvery(
		subscribeToStrategytypes.SUBSCRIBE_TO_STRATEGY,
		asyncSubscribeToStrategy,
	);
}
