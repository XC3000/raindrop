/** @format */

import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import { API } from "../axios/instance";
import qs from "qs";
import {
	fetchDataError,
	fetchDataSuccess,
	types,
} from "../actions/action.auth";
function* asyncFetchAuthData(action) {
	try {
		const api = "https://raintech.ai/Raindrop/userAuth.php?apicall=loginUser";
		const body = qs.stringify(action.payload);
		const response = yield call(() =>
			API.post(api, body, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}),
		);
		// console.log(response);
		if (response?.data?.Data?.E) {
			yield put(fetchDataError(response?.data?.Data?.M));
		} else {
			yield put(fetchDataSuccess(response?.data?.Data?.D));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchFetchAuthDataSaga() {
	yield takeLatest(types.AUTH_SEND_REQUEST, asyncFetchAuthData);
}
