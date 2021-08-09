/** @format */

import { call, put, takeEvery } from "@redux-saga/core/effects";
import { types, fetchDataSuccess } from "../actions/action.RequestData";
import { fetchDataError } from "../actions/action.RequestError";
import { RequestLoading } from "../actions/action.RequestLoading";
import { API } from "../axios/instance";

function* asyncFetchStrategyLibraryStatisticData(action) {
	try {
		yield put(RequestLoading({ StrategyLibraryStatistic: true }));
		yield put(fetchDataError({ StrategyLibraryStatistic: null }));
		let response = yield call(async () =>
			API.get(
				`https://raintech.ai/Raindrop/raintech.php?apicall=getStrategyStats&stratID=${action.payload}`,
			),
		);
		// console.log(response);
		if (response?.data?.E) {
			yield put(
				fetchDataError({ StrategyLibraryStatistic: response?.data?.M }),
			);
			yield put(fetchDataSuccess({ StrategyLibraryStatistic: null }));
			yield put(RequestLoading({ StrategyLibraryStatistic: false }));
		} else {
			yield put(RequestLoading({ StrategyLibraryStatistic: false }));
			yield put(
				fetchDataSuccess({ StrategyLibraryStatistic: response?.data?.Data }),
			);
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchFetchStrategyLibraryStatisticSaga() {
	yield takeEvery(
		types.SEND_STRATEGY_LIBRARY_STATISTIC_REQUEST,
		asyncFetchStrategyLibraryStatisticData,
	);
}
