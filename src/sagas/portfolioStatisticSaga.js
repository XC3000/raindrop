/** @format */

import { call, put, takeEvery } from "@redux-saga/core/effects";
import { types, fetchDataSuccess } from "../actions/action.RequestData";
import { fetchDataError } from "../actions/action.RequestError";
import { RequestLoading } from "../actions/action.RequestLoading";
import { API } from "../axios/instance";

function* asyncFetchPortfolioStatisticData(action) {
	try {
		yield put(RequestLoading({ portfolioStatistic: true }));
		yield put(fetchDataError({ portfolioStatistic: null }));
		let response = yield call(async () =>
			API.get(
				`https://raintech.ai/Raindrop/raintech.php?apicall=getPortfolioStats&strategyID=${action.payload}`,
			),
		);
		// console.log(response);
		if (response?.data?.E) {
			yield put(fetchDataError({ portfolioStatistic: response?.data?.M }));
			yield put(fetchDataSuccess({ portfolioStatistic: null }));
			yield put(RequestLoading({ portfolioStatistic: false }));
		} else {
			yield put(RequestLoading({ portfolioStatistic: false }));
			yield put(fetchDataSuccess({ portfolioStatistic: response?.data?.Data }));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchFetchPortfolioStatisticSaga() {
	yield takeEvery(
		types.SEND_PORTFOLIO_STATISTICS_REQUEST,
		asyncFetchPortfolioStatisticData,
	);
}
