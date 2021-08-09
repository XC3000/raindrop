/** @format */

import { call, put, takeEvery } from "@redux-saga/core/effects";
import { changeSelectedStrategyCard } from "../actions/action.changeCurrentStrategyCard";

import { types, fetchDataSuccess } from "../actions/action.RequestData";
import { fetchDataError } from "../actions/action.RequestError";
import { RequestLoading } from "../actions/action.RequestLoading";
import { API } from "../axios/instance";

function* asyncFetchStrategyLibraryData(action) {
  try {
    yield put(RequestLoading({ strategyLibrary: true }));
    yield put(fetchDataError({ starategyLibrary: null }));
    let response = yield call(
      async () => await API.get("Raindrop/raintech.php?apicall=strategyLibrary")
    );
    if (response?.data?.Data?.E) {
      yield put(fetchDataError({ starategyLibrary: response?.data?.Data?.M }));
      yield put(RequestLoading({ strategyLibrary: false }));
    } else {
      const Strategycards = response?.data?.Data?.filter(
        (item) => item["Library"] !== "PRIVATE"
      );
      const firstElementFromResponse = Strategycards[0];
      yield put(RequestLoading({ strategyLibrary: false }));
      yield put(fetchDataSuccess({ strategyLibrary: Strategycards }));
      yield put(changeSelectedStrategyCard(firstElementFromResponse)); // to set currentStrategyCard reducer to the first element.
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchFetchStrategyLibrarySaga() {
  yield takeEvery(
    types.SEND_STRATEGY_LIBRARY_REQUEST,
    asyncFetchStrategyLibraryData
  );
}
