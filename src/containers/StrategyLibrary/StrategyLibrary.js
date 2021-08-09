/** @format */

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoElement from "../../components/InfoElement/InfoElement";
import Jumbotron from "../../components/jumbotron";
import JumbotronLeft from "../../components/jumbotronLeft/JumbotronLeft";
import JumbotronRight from "../../components/jumbotronRight/JumbotronRight";
import Dashboard from "../dashboard/Dashboard";
import { types } from "../../actions/action.RequestData";
import CardSlider from "../../components/CardSlider/CardSlider";

function StrategyLibrary() {
	let strategyCardData = useSelector(
		(state) => state?.appData?.strategyLibrary,
	);
	const currentStrategyCard = useSelector(
		(state) => state?.currentStrategyCard,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: types.SEND_STRATEGY_LIBRARY_REQUEST });
	}, [dispatch]);
	const sliderProps = { cardType: "StrategyCard" };
	const jumbotronRight = (
		<JumbotronRight
			stratId={currentStrategyCard?.["Strategy ID"]}
			type="StrategyCard"
		/>
	);
	const jumbotronLeft = (
		<JumbotronLeft>
			<InfoElement type="strategyLibrary" />
		</JumbotronLeft>
	);
	const jumbotron = <Jumbotron left={jumbotronLeft} right={jumbotronRight} />;
	const slider = <CardSlider cardType="StrategyCard" />;

	//if there is no strategy card then nothing will be shown in screen
	// can be used to show a page when there is no strategy card
	if (strategyCardData === null) return null;

	return <Dashboard top={jumbotron} bottom={slider} />;
}

export default StrategyLibrary;
