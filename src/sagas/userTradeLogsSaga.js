/** @format */

import { call, put, takeEvery } from "@redux-saga/core/effects";
import { types, fetchDataSuccess } from "../actions/action.RequestData";
import { fetchDataError } from "../actions/action.RequestError";
import { RequestLoading } from "../actions/action.RequestLoading";
import { API } from "../axios/instance";

function* asyncFetchUserTradeLogsData(action) {
	try {
		yield put(RequestLoading({ userTradeLogs: true }));
		yield put(fetchDataError({ userTradeLogs: false })); // to make any previous error message null
		let response = yield call(() =>
			API.get(
				`Raindrop/raintech.php?apicall=userTradeLogs&strategyID=${action.payload.strategyID}&start=${action.payload.start}&end=${action.payload.end}`,
			),
		);
		if (response?.data?.E) {
			yield put(fetchDataError({ userTradeLogs: response?.data?.M }));
			yield put(fetchDataSuccess({ userTradeLogs: null }));
			yield put(RequestLoading({ userTradeLogs: false }));
		} else {
			yield put(fetchDataSuccess({ userTradeLogs: response?.data?.Data }));
			yield put(RequestLoading({ userTradeLogs: false }));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchFetchUserTradeLogsSaga() {
	yield takeEvery(types.SEND_USER_TRADES_REQUEST, asyncFetchUserTradeLogsData);
}
