/** @format */

import { call, put, takeEvery } from "@redux-saga/core/effects";
import { types, fetchDataSuccess } from "../actions/action.RequestData";
import { fetchDataError } from "../actions/action.RequestError";
import { RequestLoading } from "../actions/action.RequestLoading";
import { API } from "../axios/instance";
import qs from "qs";

function* asyncFetchStaticChartData(action) {
	try {
		yield put(RequestLoading({ staticChartData: true }));
		yield put(fetchDataError({ staticChartData: null }));
		let response = yield call(async () =>
			API.get(
				`https://raintech.ai/Raindrop/raintech.php?apicall=getStaticCharts&option=${action?.payload?.option}&id=${action?.payload?.id}&strategyID=${action?.payload?.strategyID}&statistic=${action?.payload?.statistic}&start=${action?.payload?.start}&end=${action?.payload?.end}`,
			),
		);
		// console.log(response);
		if (response?.data?.E) {
			yield put(fetchDataError({ staticChartData: response?.data?.M }));
			yield put(fetchDataSuccess({ staticChartData: null }));
			yield put(RequestLoading({ staticChartData: false }));
		} else {
			yield put(fetchDataError({ staticChartData: null }));
			yield put(RequestLoading({ staticChartData: false }));
			yield put(fetchDataSuccess({ staticChartData: response?.data?.Data }));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchFetchStaticChartSaga() {
	yield takeEvery(types.SEND_STATIC_CHART_REQUEST, asyncFetchStaticChartData);
}
