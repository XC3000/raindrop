/** @format */

import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
	LeftJumbotronCard: {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
		padding: "10px 20px",
		boxSizing: "border-box",
		width: "100%",
		// border: "2px red solid",
	},
}));

function JumbotronLeft(props) {
	const classes = useStyles();
	return <div className={classes.LeftJumbotronCard}>{props.children}</div>;
}

export default JumbotronLeft;
