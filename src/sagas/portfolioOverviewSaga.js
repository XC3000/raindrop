/** @format */

import { call, put, takeEvery } from "@redux-saga/core/effects";
import { types, fetchDataSuccess } from "../actions/action.RequestData";
import { fetchDataError } from "../actions/action.RequestError";
import { RequestLoading } from "../actions/action.RequestLoading";
import { API } from "../axios/instance";

function* asyncFetchPortfolioOverviewData(action) {
	try {
		yield put(RequestLoading({ portfolioOverview: true }));
		let response = yield call(async () =>
			API.get(
				`Raindrop/raintech.php?apicall=getUserStratigies&option=${action.payload}`,
			),
		);
		// console.log(response);
		if (response?.data?.Data?.E) {
			yield put(fetchDataError({ portfolioOverview: response?.data?.Data?.M }));
			yield put(RequestLoading({ portfolioOverview: false }));
		} else {
			// const firstElementFromResponse = response?.data?.Data[0];
			yield put(RequestLoading({ portfolioOverview: false }));
			yield put(
				fetchDataSuccess({ portfolioOverview: response?.data?.Data?.[0] }),
			);
			// yield put(changeSelectedStrategyCard(firstElementFromResponse)); // to set currentStrategyCard reducer to the first element.
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchFetchPortfolioOverviewSaga() {
	yield takeEvery(
		types.SEND_PORTFOLIO_OVERVIEW_REQUEST,
		asyncFetchPortfolioOverviewData,
	);
}
