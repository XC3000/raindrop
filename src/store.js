/** @format */

import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import createSagaMiddleware from "redux-saga";
import RootReducer from "./reducers/rootReducer";
import RootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	RootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(RootSaga);

export default store;
