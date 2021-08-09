/** @format */

import { Grid, Typography, Button, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	showcaseCardContainer: {
		backgroundColor: "#282C31",
		width: "400px",
		height: "250px",
		borderRadius: "10px",
		padding: "10px 20px",
		boxSizing: "border-box",
		margin: "0 10px",
		color: "#CACACA",
	},
}));

export default function ShowcaseCard({
	link,
	title,
	img,
	buttonText,
	subImageText,
}) {
	const classes = useStyles();
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="center"
			className={classes.showcaseCardContainer}
			spacing={2}
		>
			<Grid item>
				<Typography color="primary" style={{ fontSize: "18px" }}>
					{title}{" "}
				</Typography>
			</Grid>
			<Grid item>
				<img src={img} ait="help_img" />
			</Grid>
			<Grid item>{subImageText}</Grid>
			<Grid item>
				<Link to={link}>
					<Button
						variant="outlined"
						color="primary"
						size="small"
						style={{ width: "300px" }}
					>
						{buttonText}
					</Button>
				</Link>
			</Grid>
		</Grid>
	);
}
