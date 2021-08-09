/** @format */

import React, { useEffect } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	popover: {
		pointerEvents: "none",
	},
	paper: {
		padding: theme.spacing(1),
	},
}));
export default function PopOver({
	text,
	anchorEl,
	handlePopoverClose,
	type,
	id,
	children,
}) {
	const classes = useStyles();
	const open = Boolean(id === anchorEl?.id && anchorEl ? true : false);
	// console.log(open);

	useEffect(() => {
		handlePopoverClose();
	}, [type]);

	return (
		<Popover
			id="mouse-over-popover"
			className={classes.popover}
			classes={{
				paper: classes.paper,
			}}
			open={open}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "left",
			}}
			onClose={() => handlePopoverClose()}
			onExit={handlePopoverClose}
			disableRestoreFocus
		>
			<Typography>{text}</Typography>
			{children}
		</Popover>
	);
}
