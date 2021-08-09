/** @format */

import { ListItem } from "@material-ui/core";
import { Typography, ListItemText, Divider } from "@material-ui/core";
import { List } from "@material-ui/core";
import React from "react";

export default function FeatureUpgrades() {
	return (
		<List>
			<ListItem>
				<ListItemText
					primary={
						<Typography variant="body1" color="primary">
							Trade Reporting
						</Typography>
					}
					secondary={
						<>
							<Typography
								variant="body2"
								align="justified"
								style={{ color: "#CACACA" }}
							>
								An intuitive and well-designed report of the trading activity
								with statistics and insights into your trading. Deliverable at
								the end of the day or week.
							</Typography>
						</>
					}
				/>
			</ListItem>
			<Divider
				variant="primary"
				component="li"
				style={{ backgroundColor: "#ffffff50" }}
			/>
			<ListItem>
				<ListItemText
					primary={
						<Typography variant="body1" color="primary">
							Automated Trade Error Management
						</Typography>
					}
					secondary={
						<>
							<Typography
								variant="body2"
								align="justified"
								style={{ color: "#CACACA" }}
							>
								A universal scanner that is frequently checking if your open
								positions match the open positions of the algorithm. If there is
								a deviation, the system auto-corrects the deviation.
							</Typography>
						</>
					}
				/>
			</ListItem>
			<Divider
				variant="primary"
				component="li"
				style={{ backgroundColor: "#ffffff50" }}
			/>
			<ListItem>
				<ListItemText
					primary={
						<Typography variant="body1" color="primary">
							Recursive Limit Orders
						</Typography>
					}
					secondary={
						<>
							<Typography
								variant="body2"
								align="justified"
								style={{ color: "#CACACA" }}
							>
								Initially available on select brokers, the order-type enables
								producers to more effectively target execution efficiency. Given
								the complexity of the order type, this order type would require
								the producer to justify a strong use case before being granted
								access to use the order type.
							</Typography>
						</>
					}
				/>
			</ListItem>
			<Divider
				variant="primary"
				component="li"
				style={{ backgroundColor: "#ffffff50" }}
			/>
			<ListItem>
				<ListItemText
					primary={
						<Typography variant="body1" color="primary">
							Recursive Limit Orders
						</Typography>
					}
					secondary={
						<>
							<Typography
								variant="body2"
								align="justified"
								style={{ color: "#CACACA" }}
							>
								Initially available on select brokers, the order-type enables
								producers to more effectively target execution efficiency. Given
								the complexity of the order type, this order type would require
								the producer to justify a strong use case before being granted
								access to use the order type.
							</Typography>
						</>
					}
				/>
			</ListItem>
			<Divider
				variant="primary"
				component="li"
				style={{ backgroundColor: "#ffffff50" }}
			/>
			<ListItem>
				<Typography
					variant="body1"
					color="primary"
					style={{ marginBottom: "-10px" }}
				>
					Live Trade Reporting:
				</Typography>
			</ListItem>
			<ListItem>
				<ListItemText
					primary={
						<Typography variant="body1" color="primary">
							Live PNL/ Accounting
						</Typography>
					}
					secondary={
						<>
							<Typography
								variant="body2"
								align="justified"
								style={{ color: "#CACACA" }}
							>
								The portfolio overview is now live. We are building a more
								enriching environment, by extending the live tracking to
								strategy level and sub-strategy level PNL.
							</Typography>
						</>
					}
				/>
			</ListItem>
			<Divider
				variant="primary"
				component="li"
				style={{ backgroundColor: "#ffffff50" }}
			/>
			<ListItem>
				<ListItemText
					primary={
						<Typography variant="body1" color="primary">
							Live PNL Charting
						</Typography>
					}
					secondary={
						<>
							<Typography
								variant="body2"
								align="justified"
								style={{ color: "#CACACA" }}
							>
								Enjoy tracking the progress of your algorithms via the live
								charts. Get a minute-by-minute update on the status of your
								performance.
							</Typography>
						</>
					}
				/>
			</ListItem>
		</List>
	);
}
