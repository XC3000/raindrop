/** @format */

import React, { useEffect, useState } from "react";
import {
	withStyles,
	TextField,
	makeStyles,
	Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		"& label.Mui-focused": {
			color: "green",
		},
		width: "200px",
	},
	"MuiInputBase-root": {
		borderColor: "red",
	},
}));

export default function Input({
	select = false,
	selectChildren = null,
	onChange,
	value = "",
	type,
	name,
	label,
	width = "150px",
	height = "30px",
	onBlur,
	ref,
}) {
	const classes = useStyles();

	const CustomInput = withStyles((theme) => ({
		root: {
			"& .MuiOutlinedInput-root": {
				width: width,
				height: height,
				fontSize: "12px",
				fontWeight: "600",
				"& fieldset": {
					border: `1px solid ${theme.palette.background.stroke}`,
				},
				"&:hover fieldset": {
					borderColor: "#4684F0",
				},
				"&.Mui-focused fieldset": {
					borderColor: theme.palette.primary,
				},
			},
		},
	}))(TextField);

	return (
		<CustomInput
			variant="outlined"
			margin="dense"
			select={select}
			type={!select && type}
			label={label}
			value={value}
			InputLabelProps={{
				shrink: true,
			}}
			onChange={onChange}
			onBlur={onBlur}
			name={name}
			ref={ref}
		>
			{select && selectChildren}
		</CustomInput>
	);
}
