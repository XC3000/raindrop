/** @format */

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import changeThemeReducer from "./changeThemeReducer";
import appDataReducer from "./appDataReducer";
import appErrorReducer from "./appErrorReducer";
import appDataLoadingReducer from "./appLoadingReducer";
import CurrentStrategyCardReducer from "./currentStrategyCardReducer";
import selectedPortfolioCard from "./selectedPortfolioCardReducer";
import livepnlReducer from "./livepnlReducer";
const RootReducer = combineReducers({
	authReducer,
	changeThemeReducer,
	appData: appDataReducer,
	currentStrategyCard: CurrentStrategyCardReducer,
	selectedPortfolioCard: selectedPortfolioCard,
	appError: appErrorReducer,
	loading: appDataLoadingReducer,
	livepnlChange: livepnlReducer,
});

export default RootReducer;
