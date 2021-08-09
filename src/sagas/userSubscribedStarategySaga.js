/** @format */

import { call, put, takeEvery } from "@redux-saga/core/effects";
import { changeSelectedPortfolioCard } from "../actions/action.changeSelectedPortfolioCard";
import { types, fetchDataSuccess } from "../actions/action.RequestData";
import { fetchDataError } from "../actions/action.RequestError";
import { RequestLoading } from "../actions/action.RequestLoading";
import { API } from "../axios/instance";

function* asyncFetchUserSubscribedStrategyData(action) {
	try {
		yield put(RequestLoading({ userSubscribedStrategies: true }));
		let response = yield call(
			async () =>
				await API.get(
					`Raindrop/raintech.php?apicall=getUserStratigies&option=${action.payload}`,
				),
		);
		// console.log(response);
		if (response?.data?.Data?.E) {
			yield put(
				fetchDataError({ userSubscribedStrategies: response?.data?.Data?.M }),
			);
			yield put(RequestLoading({ userSubscribedStrategies: false }));
		} else {
			// console.log(response?.data?.D);
			const firstElementFromResponse = response?.data?.D?.[0];
			yield put(RequestLoading({ userSubscribedStrategies: false }));
			yield put(
				fetchDataSuccess({ userSubscribedStrategies: response?.data?.Data }),
			);
			yield put(changeSelectedPortfolioCard(firstElementFromResponse)); // to set currentStrategyCard reducer to the first element.
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchFetchUserSubscribedStrategySaga() {
	yield takeEvery(
		types.SEND_USER_SUBSCRIBED_STRATEGIES_REQUEST,
		asyncFetchUserSubscribedStrategyData,
	);
}
