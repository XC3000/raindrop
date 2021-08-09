import { call, put, takeEvery } from "@redux-saga/core/effects";
import { types, fetchDataSuccess } from "../actions/action.RequestData";
import { fetchDataError } from "../actions/action.RequestError";
import { RequestLoading } from "../actions/action.RequestLoading";
import getUserDetails from "../apicalls/getUserDetails";

function* asyncFetchUserKYCData() {
  try {
    yield put(RequestLoading({ userKYC: true }));
    const { error, responseData } = yield call(() => getUserDetails());
    if (error) {
      yield put(fetchDataError({ userKYC: error }));
      yield put(RequestLoading({ userKYC: false }));
    } else {
      yield put(RequestLoading({ userKYC: false }));
      yield put(fetchDataSuccess({ userKYC: responseData }));
    }
  } catch (error) {
    console.log(error);
  }
}
export function* watchFetchUserKYCSaga() {
  yield takeEvery(types.SEND_USER_KYC_REQUEST, asyncFetchUserKYCData);
}
