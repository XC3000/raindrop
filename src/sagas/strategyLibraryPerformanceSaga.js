/** @format */

import { call, put, takeEvery } from "@redux-saga/core/effects";

import { types, fetchDataSuccess } from "../actions/action.RequestData";
import { fetchDataError } from "../actions/action.RequestError";
import { RequestLoading } from "../actions/action.RequestLoading";
import { API } from "../axios/instance";

function* asyncFetchStrategyLibraryPerfomanceData(action) {
  try {
    yield put(RequestLoading({ performanceData: true }));
    yield put(fetchDataError({ performanceData: null }));
    let response = yield call(async () =>
      API.get(
        `Raindrop/raintech.php?apicall=${action?.payload?.apicall}&id=${action?.payload?.id}`
      )
    );
    if (response?.data?.E) {
      yield put(fetchDataError({ performanceData: response?.data?.M }));
      yield put(fetchDataSuccess({ performanceData: null }));
      yield put(RequestLoading({ performanceData: false }));
    } else {
      yield put(RequestLoading({ performanceData: false }));
      yield put(fetchDataSuccess({ performanceData: response?.data?.Data }));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchFetchStrategyLibraryPerformanceSaga() {
  yield takeEvery(
    types.SEND_PERFORMANCE_REQUEST,
    asyncFetchStrategyLibraryPerfomanceData
  );
}
