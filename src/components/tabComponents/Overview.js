/** @format */

import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../actions/action.RequestData";
import OverviewCards from "./OverviewCards";
import Performancetable from "./Performancetable";

const useStyles = makeStyles((theme) => ({
	overviewContainer: {
		display: "flex",
		flexDirection: "column",
		padding: "5px 10px 5px 5px",
		marginTop: "5px",
	},

	overviewCards: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		flexBasis: "33%",
	},
}));

function Overview({ cardType, stratId }) {
	// console.log(cardType, stratId);
	const classes = useStyles();
	const currentCard = useSelector((state) => {
		if (cardType === "StrategyCard") return state?.currentStrategyCard;
		if (cardType === "portfolioWatch") return state?.selectedPortfolioCard;
	});
	const dispatch = useDispatch();
	// console.log(currentCard);
	useEffect(() => {
		if (cardType === "portfolioOverviewCard") {
			dispatch(
				fetchData({
					type: "SEND_PERFORMANCE_REQUEST",
					payload: { apicall: "getUserPerformance", id: "masterPortfolio" },
				}),
			);
		}
		if (cardType === "portfolioWatch") {
			dispatch(
				fetchData({
					type: "SEND_PERFORMANCE_REQUEST",
					payload: { apicall: "getUserPerformance", id: stratId },
				}),
			);
		}

		if (cardType === "StrategyCard") {
			dispatch(
				fetchData({
					type: "SEND_PERFORMANCE_REQUEST",
					payload: { apicall: "getStartegyPerformance", id: stratId },
				}),
			);
		}
	}, [currentCard, stratId, cardType, dispatch]);

	const cardData = [
		{
			title: "About Strategy",
			Approach: currentCard?.["approach"],
			Style: currentCard?.["Style"],
			Factors: currentCard?.["Factors"],
			Geography: currentCard?.["Geography"],
			"Instrumental Focus": currentCard?.["Instrument Focus"],
			"ML/AI": currentCard?.["ML/AI"],
			Autocompunding: currentCard?.["Auto Compounding"],
		},
		{
			title: "Investment Details",
			"Minium Investment": currentCard?.["Min. Investment"],
			"Additonal Investment": currentCard?.["Additonal Investment"],
			"Maximum Investment": currentCard?.["Max. Investment"],
			"Max. Margin Utilisation": currentCard?.["Max Margin Utilization"],
			"Min. Risk Buffer": currentCard?.["Margin Risk Buffer"],
			"Max. Gross Leverage": currentCard?.["Max. Gross Exposure"],
			"Max. Net Leverage": currentCard?.["Max. Net Exposure"],
		},
		{
			title: "Terms & Restrictions",
			"Producer Name": currentCard?.["Producer Name"],
			"Annual Subscription Fees": currentCard?.["Subscription Fees"],
			"Performance Fees": currentCard?.["Perfromance Fees"],
			// "Observation Period": currentCard?.["Geography"],
			"BT Return": currentCard?.["Backtest Returns"],
			"BT Max. Drawdown": currentCard?.["Backtest Drawdown"],
			"Target Volatility": currentCard?.["Target Volatility"],
		},
	];

	return (
		<div className={classes.overviewContainer}>
			<div classes={classes.overviewPerformanceTable}>
				<Performancetable />
			</div>
			{/* if cardType is portofolioOverviewCard don't show cards */}
			{cardType === "portfolioOverviewCard" ? null : (
				<div className={classes.overviewCards}>
					{cardData?.map((item) => (
						<OverviewCards cardData={item} />
					))}
				</div>
			)}
		</div>
	);
}

export default Overview;
