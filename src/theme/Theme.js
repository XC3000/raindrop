/** @format */
import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { themeDark } from "./darkTheme";
import { themeLight } from "./lightTheme";

const Theme = (props) => {
	const state = useSelector((state) => state.changeThemeReducer);

	const darkTheme = createMuiTheme(themeDark);
	const lightTheme = createMuiTheme(themeLight);

	// console.log(themeLight);

	return (
		<ThemeProvider theme={state.darkTheme ? darkTheme : lightTheme}>
			<CssBaseline />
			<div
				style={{ maxHeight: "100vh", maxWidth: "100vw", overflow: "hidden" }}
			>
				<Navbar />
				{props.children}
			</div>
		</ThemeProvider>
	);
};

export default Theme;
