/** @format */

import {
	List,
	ListItem,
	ListItemText,
	Typography,
	Divider,
	makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
	text: {
		"&:hover": {
			color: "#CACACA40",
		},
	},
}));

export default function PrAnnouncement() {
	const classes = useStyles();
	return (
		<List>
			<ListItem>
				<ListItemText
					secondary={
						<>
							<a
								href={
									"https://www.dsij.in/DSIJArticleDetail/ArtMID/10163/ArticleID/18146/Robo-advisors-Machine-learning-in-trend-following-ETF-investments"
								}
								target={"_blank"}
							>
								<Typography
									variant="body2"
									align="justified"
									style={{ color: "#CACACA" }}
									className={classes.text}
								>
									Robo-advisors: Machine learning in trend-following ETF
									investments
								</Typography>
							</a>
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
					secondary={
						<>
							<a
								href={
									"https://www-moneycontrol-com.cdn.ampproject.org/c/s/www.moneycontrol.com/news/business/markets/here-is-how-to-approach-market-in-a-disciplined-data-driven-manner-through-algo-trading-6843381.html/amp"
								}
								target={"_blank"}
							>
								<Typography
									variant="body2"
									align="justified"
									style={{ color: "#CACACA" }}
								>
									Here is how to approach market in a disciplined, data-driven
									manner through algo trading. By Raghu on Moneycontrol.com
								</Typography>
							</a>
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
					secondary={
						<>
							<a
								href={
									"https://www.livemint.com/market/stock-market-news/share-market-live-updates-sensex-nifty-bse-nse-stock-market-today-06-04-2021-adani-ports-11620178005388.html"
								}
								target={"_blank"}
							>
								<Typography
									variant="body2"
									align="justified"
									style={{ color: "#CACACA" }}
								>
									RBI's liquidity measures lift Sensex by 424 pts; Nifty ends at
									14618; banks gain. By Harsh Agarwal on livemint.com
								</Typography>
							</a>
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
					secondary={
						<>
							<a
								href={
									"https://www.financialexpress.com/economy/rbi-governor-shaktikanta-das-to-address-press-conference-soon-surprise-rate-cut-on-cards/2246029/"
								}
								target={"_blank"}
							>
								<Typography
									variant="body2"
									align="justified"
									style={{ color: "#CACACA" }}
								>
									RBI Guv Highlights: Shaktikanta Das rolls out stimulus
									measures amid 2nd Covid wave; liquidity, credit. By Harsh
									Agarwal on financialexpress.com
								</Typography>
							</a>
						</>
					}
				/>
			</ListItem>
			<Divider
				variant="primary"
				component="li"
				style={{ backgroundColor: "#ffffff50" }}
			/>
		</List>
	);
}
