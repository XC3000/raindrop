/** @format */

import React from "react";
import {
	Button,
	Checkbox,
	Grid,
	makeStyles,
	Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	subscribeInputs: {
		width: "100%",
		height: "30px",
		padding: "0px 5px",
		boxSizing: "border-box",
		borderRadius: "5px",
		fontSize: "12px",
		backgroundColor: theme.palette.background.BG,
		border: `1px solid ${theme.palette.background.stroke}`,
		color: theme.palette.text.primary,
		"&:focus": {
			outline: "none",
			border: "3px solid #4684f0",
		},
	},
}));

export function APIDetails({ handleChange }) {
	const classes = useStyles();
	const [checked, setChecked] = React.useState(false);

	const handleCheckChange = (event) => {
		setChecked(!checked);
	};

	return (
		<Grid container direction="column" spacing={2} justify="flex-start">
			<Typography variant="body2">
				You can manually enter the details below or click the button to generate
				the API Details automatically.
			</Typography>

			<Grid item container direction="column" spacing={1} justify="flex-start">
				<Grid item>
					<label>
						<Typography variant="body2">Requested URL</Typography>
					</label>
					<input
						type="text"
						name="redirecturl"
						className={classes.subscribeInputs}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item>
					<label>
						<Typography variant="body2">API Key</Typography>
					</label>
					<input
						type="text"
						name="apikey"
						className={classes.subscribeInputs}
						style={{ width: "100%" }}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item>
					<label>
						<Typography variant="body2">API Secret</Typography>
					</label>
					<input
						type="text"
						name="apisecret"
						className={classes.subscribeInputs}
						onChange={handleChange}
					/>
				</Grid>
			</Grid>
			<Grid container direction="row" justify="flex-start" alignItems="center">
				<Checkbox
					checked={checked}
					color="primary"
					onChange={handleCheckChange}
					inputProps={{ "aria-label": "secondary checkbox" }}
				/>
				<Typography variant="body2">Auto generate API details. </Typography>
				{checked && (
					<Grid item container direction="column" alignItems="center">
						{" "}
						<Button
							variant="outlined"
							color="primary"
							style={{ width: "80%", marginBottom: "20px" }}
						>
							AUTO-GENERATE API DETAILS
						</Button>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
}
