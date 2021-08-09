/** @format */

import { all } from "redux-saga/effects";
import { watchFetchAuthDataSaga } from "./authSaga";
import { watchFetchStrategyLibraryPerformanceSaga } from "./strategyLibraryPerformanceSaga";
import { watchFetchStrategyLibrarySaga } from "./strategyLibrarySaga";
import { watchFetchStaticChartSaga } from "./staticChartSaga";
import { watchFetchStrategyLibraryStatisticSaga } from "./strategyLibraryStatisticSaga";
import { watchFetchUserSubscribedStrategySaga } from "./userSubscribedStarategySaga";
import { watchFetchPortfolioOverviewSaga } from "./portfolioOverviewSaga";
import { watchFetchPortfolioStatisticSaga } from "./portfolioStatisticSaga";
import { watchFetchUserBrokersSaga } from "./userBrokerSaga";
import { watchSubscribeToStrategySaga } from "./subscribeToStrategySaga";
import { watchConfigureStrategySaga } from "./configureStrategySaga";
import { watchFetchUserTradeLogsSaga } from "./userTradeLogsSaga";
import { watchFetchUserKYCSaga } from "./getuserKYCSaga";

export default function* RootSaga() {
  yield all([
    watchFetchAuthDataSaga(),
    watchFetchStrategyLibrarySaga(),
    watchFetchStrategyLibraryPerformanceSaga(),
    watchFetchStaticChartSaga(),
    watchFetchStrategyLibraryStatisticSaga(),
    watchFetchUserSubscribedStrategySaga(),
    watchFetchPortfolioOverviewSaga(),
    watchFetchPortfolioStatisticSaga(),
    watchFetchUserBrokersSaga(),
    watchSubscribeToStrategySaga(),
    watchConfigureStrategySaga(),
    watchFetchUserTradeLogsSaga(),
    watchFetchUserKYCSaga(),
  ]);
}
