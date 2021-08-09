/** @format */

import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
	portfolioOverviewContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		backgroundColor: theme.palette.background.paper,
		width: "400px",
		height: "200px",
		borderRadius: "10px",
		padding: "10px 20px",
		boxSizing: "border-box",
		"&:hover": {
			border: "2px solid #4684F0",
		},
	},
}));

export default function PortfolioOverviewCard({ setCardType }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const data = useSelector((state) => state?.appData?.portfolioOverview);

	useEffect(() => {
		dispatch({ type: "SEND_PORTFOLIO_OVERVIEW_REQUEST", payload: "master" });
	}, [dispatch]);
	return (
		<div
			className={classes.portfolioOverviewContainer}
			onClick={() => setCardType("portfolioOverviewCard")}
		>
			<Grid item container direction="column">
				<Grid
					item
					container
					direction="row"
					justify="space-between"
					alignItems="center"
				>
					<Typography variant="body1" color="primary">
						Portfolio Overview
					</Typography>
					<Typography variant="body1" color="primary">
						<InfoIcon />
					</Typography>
				</Grid>
				<Typography variant="body2">
					You have invested in {data?.number}{" "}
					{parseInt(data?.number) > 1 ? "strategies" : "strategy"}.
				</Typography>
			</Grid>
			<Grid
				container
				direction="row"
				justify="space-between"
				spacing={3}
				// justify="center"
			>
				<Grid item direction="column" justify="center">
					<Typography variant="body2">Total Investment</Typography>
					<Typography variant="body2">
						{data?.["Total Subscription Value"]}
					</Typography>
				</Grid>
				<Grid item direction="column" justify="center">
					<Typography variant="body2">Current Value</Typography>
					<Typography variant="body2">
						{data?.["Current Subscription Value"]}
					</Typography>
				</Grid>
				<Grid item direction="column" justify="center">
					<Typography variant="body2" color="primary">
						{data?.["PNL_PCT"]}
					</Typography>
					<Typography variant="body2" color="primary">
						Total PnL
					</Typography>
				</Grid>
			</Grid>
			<Grid
				container
				direction="row"
				justify="space-between"
				spacing={3}
				// justify="center"
			>
				<Grid item direction="column" justify="center">
					<Typography variant="body2">Realized Gains</Typography>
					<Typography variant="body2">
						{data?.["Realized Profit/Loss"]}
					</Typography>
				</Grid>
				<Grid item direction="column" justify="center">
					<Typography variant="body2">Unrealized Gains</Typography>
					<Typography variant="body2">
						{data?.["Un-Realized Profit/Loss"]}
					</Typography>
				</Grid>
				<Grid item direction="column" justify="center">
					<Typography variant="body2">1.5%</Typography>
					<Typography variant="body2">Today</Typography>
				</Grid>
			</Grid>
		</div>
	);
}
