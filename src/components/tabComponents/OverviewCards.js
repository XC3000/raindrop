/** @format */

import { ListItem, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
	OverviewCardsContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		border: `1px solid ${theme.palette.background.stroke}`,
		borderRadius: "13px",
		backgroundColor: theme.palette.background.BG,
		minHeight: "230px",
		maxHeight: "230px",
		width: "30%",
		padding: "10px",
	},
	overviewCardItemContainer: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
	},
	overviewCardItems: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		padding: "5px 0",
		// border: "1px solid red",
		width: "100%",
	},
}));

function OverviewCards({ cardData }) {
	const classes = useStyles();

	//converting object to array and slicing it to get elemnts from index 1 to end
	const cardRows = Object.entries(cardData).slice(1);

	return (
		<div className={classes.OverviewCardsContainer}>
			<Typography varaint="body1" color="primary">
				{cardData.title}
			</Typography>

			<div className={classes.overviewCardItemContainer}>
				{cardRows.map((item) => (
					<ListItem className={classes.overviewCardItems}>
						<Typography variant="body2">{item[0]}</Typography>
						<Typography variant="body2">
							{item[1] !== "" ? item[1] : "N/A"}
						</Typography>
					</ListItem>
				))}
			</div>
		</div>
	);
}

export default OverviewCards;
