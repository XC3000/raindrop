/** @format */

import { call, put, takeEvery } from "@redux-saga/core/effects";

import { types, fetchDataSuccess } from "../actions/action.RequestData";
import { fetchDataError } from "../actions/action.RequestError";
import { RequestLoading } from "../actions/action.RequestLoading";
import { API } from "../axios/instance";

function* asyncFetchUserBrokersData(action) {
  try {
    yield put(RequestLoading({ userBrokers: true }));
    let response = yield call(
      async () =>
        await API.get("Raindrop/raintech.php?apicall=getUserBrokerMap")
    );
    // console.log(response);
    if (response?.data?.E) {
      yield put(fetchDataSuccess({ userBrokers: [] }));
      yield put(fetchDataError({ userBrokers: response?.data?.Data?.M }));
      yield put(RequestLoading({ userBrokers: false }));
    } else {
      yield put(RequestLoading({ userBrokers: false }));
      yield put(fetchDataSuccess({ userBrokers: response?.data?.Data }));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchFetchUserBrokersSaga() {
  yield takeEvery(types.SEND_USER_BROKERS_REQUEST, asyncFetchUserBrokersData);
}
