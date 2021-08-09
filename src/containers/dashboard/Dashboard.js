/** @format */

import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
	dashboardContainer: {
		backgroundColor: theme.palette.background.default,
		minHeight: "93vh",
		maxHeight: "93vh",
		color: theme.palette.text.primary,
		padding: "10px 10px",
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
		borderRadius: "12px",
		// border: "2px red solid",
	},
}));

function Dashboard(props) {
	const classes = useStyles();
	document.title = "RAIN-Dashboard";
	return (
		<div className={classes.dashboardContainer}>
			<div className={classes.jumbotron}>{props.top}</div>
			<div className={classes.slider}>{props.bottom}</div>
		</div>
	);
}
export default Dashboard;
