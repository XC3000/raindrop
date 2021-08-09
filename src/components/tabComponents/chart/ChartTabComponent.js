/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchData } from "../../../actions/action.RequestData";
import moment from "moment";
import { Grid, makeStyles, MenuItem } from "@material-ui/core";
import ErrorPage from "../../errorPage/ErrorPage";
import Input from "../../Input/Input";
import chartTypesOption from "./chartTypeOptions";
import { Radio, Checkbox } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import HistoryChart from "./HistoryChart";
import LiveChart from "./LiveChart";

const useStyles = makeStyles((theme) => ({
	chartTabContainer: {
		display: "flex",
		flexDirection: "column",
		padding: "5px",
		marginTop: "-5px",
	},
}));

function ChartTabComponent({ cardType }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const location = useLocation();
	const currentCard = useSelector((state) => {
		if (cardType === "StrategyCard") return state?.currentStrategyCard;
		if (cardType === "portfolioWatch") return state?.selectedPortfolioCard;
	});
	const error = useSelector((state) => state?.appError?.staticChartData);
	const [paramsObj, setParamsObj] = useState(null);
	const [isLiveChart, setIsLiveChart] = React.useState(false);
	const handleCheckButtonChange = (event) => {
		setIsLiveChart(!isLiveChart);
	};

	useEffect(() => {
		const getDefaultParams = () => {
			const start = paramsObj?.start
				? paramsObj?.start
				: moment().subtract(1, "years").format("yyyy-MM-DD");
			const end = paramsObj?.end
				? paramsObj?.end
				: moment().format("yyyy-MM-DD");
			const statistic = "NAV";
			const strategyID =
				cardType === "portfolioOverviewCard"
					? "masterPortfolio"
					: currentCard?.["Strategy ID"];
			let option =
				location.pathname === "/dashboard/market-place"
					? "strategy"
					: "user";

			setParamsObj({
				option,
				start,
				end,
				statistic,
				id: strategyID,
				strategyID,
			});
			dispatch(
				fetchData({
					type: "SEND_STATIC_CHART_REQUEST",
					payload: {
						option,
						start,
						end,
						statistic,
						id: strategyID,
						strategyID,
					},
				}),
			);
		};
		getDefaultParams();
	}, [currentCard]);

	const handleChange = (e) => {
		let data = null;
		console.log(e.target.name);
		if (e.target.name === "statistic") {
			console.log(e.target.name);
			data = { ...paramsObj, [e.target.name]: e.target.value };
			setParamsObj({
				...paramsObj,
				[e.target.name]: e.target.value,
			});
		} else {
			data = {
				...paramsObj,
				[e.target.name]: moment(e.target.value).format("yyyy-MM-DD"),
			};
			setParamsObj({
				...paramsObj,

				[e.target.name]: moment(e.target.value).format("yyyy-MM-DD"),
			});
		}

		dispatch({
			type: "SEND_STATIC_CHART_REQUEST",
			payload: data,
		});
	};

	useEffect(() => {
		setIsLiveChart(false);
	}, [cardType]);

	return (
		<div className={classes.chartTabContainer}>
			<Grid container direction="row" spacing={2} justify="flex-end">
				{cardType === "portfolioOverviewCard" && (
					<Grid item>
						<Checkbox
							checked={isLiveChart}
							onChange={handleCheckButtonChange}
							color="primary"
							size="small"
						/>
						<Typography
							variant="body1"
							display="inline"
							style={{ marginLeft: "-5px" }}
						>
							Live Chart
						</Typography>
					</Grid>
				)}
				{!isLiveChart && (
					<>
						{" "}
						<Grid item>
							<Input
								type="date"
								onChange={handleChange}
								value={paramsObj?.start}
								name="start"
								label="Start Date"
							/>
						</Grid>
						<Grid item>
							{" "}
							<Input
								type="date"
								onChange={handleChange}
								value={paramsObj?.end}
								name="end"
								label="End Date"
							/>
						</Grid>
						<Grid item>
							<Input
								select={true}
								onChange={handleChange}
								value={paramsObj?.statistic}
								name="statistic"
								label="Statistic"
								selectChildren={chartTypesOption.map((item) => (
									<MenuItem value={item.value} key={item.id}>
										{item.name}
									</MenuItem>
								))}
								width="200px"
							/>
						</Grid>{" "}
					</>
				)}
			</Grid>
			{isLiveChart && <LiveChart />}
			{!isLiveChart && !error ? (
				<HistoryChart cardType={cardType} />
			) : (
				!isLiveChart && <ErrorPage errorText={error} />
			)}
		</div>
	);
}

export default ChartTabComponent;
