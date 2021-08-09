/** @format */

import { makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
	componentxContainer: {
		backgroundColor: theme.palette.background.paper,
		minHeight: "450px",
		maxHeight: "450px",
		boxShadow: "-1px 0px 7px 0px #4a4a829c",
		display: "flex",
		flexDirection: "row",
		borderRadius: "12px",
		boxSizing: "border-box",
		marginBottom: "20px",
	},
	jumbotron_left: {
		display: "flex",
		flex: "0.3",
		width: "100%",
		padding: "3px",
	},
	jumbotron_right: {
		display: "flex",
		flex: "0.7",
		width: "100%",
	},
	verticalLine: {
		borderRight: `1px solid ${theme.palette.background.stroke}`,
		height: "445px",
		marginLeft: "-8px",
	},
}));

function Jumbotron(props) {
	const darkTheme = useSelector(
		(state) => state?.changeThemeReducer?.darkTheme,
	);
	const classes = useStyles();
	return (
		<Paper
			elevation={1}
			className={classes.componentxContainer}
			style={{
				boxShadow: `${
					darkTheme
						? "-1px 0px 7px 0px #b4b4ca9e"
						: "-1px 0px 7px 0px #4a4a829c"
				}`,
			}}
		>
			{/* Left  */}
			<div className={classes.jumbotron_left}>{props.left}</div>

			<div className={classes.jumbotron_right}>{props.right}</div>
		</Paper>
	);
}

export default Jumbotron;
