/** @format */

import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import errorImg from "./errorImg.svg";
import errorImgLight from "./errorImgLight.svg";

export default function ErrorPage({ errorText, component }) {
	const isDarkTheme = useSelector(
		(state) => state?.changeThemeReducer?.darkTheme,
	);
	// console.log(component);
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="center"
			style={{ height: "100%", marginTop: "10px", marginBottom: "-10px" }}
			spacing={2}
		>
			<Grid item>
				<Typography variant="body1" style={{ fontWeight: "700" }}>
					{errorText}
				</Typography>
			</Grid>
			<Grid item>
				<img
					src={isDarkTheme ? errorImg : errorImgLight}
					alt="errorImg"
					style={{
						height: `${component === "performanceTable" ? "80px" : "150px"}`,
					}}
				/>
			</Grid>
		</Grid>
	);
}
