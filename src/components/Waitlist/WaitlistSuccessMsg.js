/** @format */

import { Grid, Typography } from "@material-ui/core";
import React from "react";
import "../../components/RegisterLoginMessageBox/registerSuccessMsg.css";
import { Link } from "react-router-dom";
export default function WaitlistSuccessMsg() {
	return (
		<Grid
			container
			direction="column"
			justify="space-between"
			className="registerMsg__container"
		>
			<Grid item>
				<Typography variant="h5" align="center" style={{ color: " #4684f0" }}>
					{" "}
					Congratulations !
				</Typography>
				<Typography
					variant="body2"
					style={{ textAlign: "justify", marginTop: "10px" }}
				>
					You have been added to the waitlist. Over the next couple of days you
					will receive an email with the details of your account. Be sure to
					check your emails. We look forward to have you onboard.
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant="body2">
					Go to Login?{" "}
					<span style={{ color: " #4684f0" }}>
						<Link to="/login">Login</Link>
					</span>
				</Typography>
			</Grid>
		</Grid>
	);
}
