/** @format */

export const PopOverdata = {
	"Portfolio Watch Summary": {
		Title: "An overview of your portfolio performance",
		"Total Subscription Value":
			"Denotes the maximum value for which you have an active subscription to the algorithm. It further denotes the value with which the algorithm will run on your brokerage account, irrespective of the margin balance on your brokerage account, subject to minimum margin being available",
		"Realized Gains": "The total profit / loss from completed transactions",
		"Unrealized Gains":
			"The total profit/loss arising from transactions that are yet to be completed. The un-realized gains is calculated based on the previous trading days settlement price for open positions.",
	},
	"Portfolio Watch Broker Summary": {
		Title: "An overview of the balances in your brokerage account",
		"Total Margin":
			"The value of the total margin available in your brokerage account at the start of the trading day",
		"Utilized Margin":
			"The value of the margin being utilized across your brokerage account. This value includes both margin being utilized by open trades carried out by the algorithms and also any other margin being utilized by trades outside the purview of RAIN.",
		"Un-utilized Margin":
			"The value of the margin that is un-utilized and can be used to carry out further trades.",
	},
	"Portfolio Watch Card Summary": {
		Title: "Algorithm cards provide you with a brief about the algorithm.",
		"Algorithm Name":
			"The name of the algorithm is captured in blue text across the top-left of the card.",
		"Deploy Button":
			"The deploy button allows you to pause or deploy an algorithm on your account. An instruction to the effect will be updated only on the next trading day, prior to market open",
		"Deployment Status":
			"Red: Suggests the algorithm is not running on your specified brokerage account. This status occurs either when you pause the deployment of an algorithm or when there is a failure in deploying the algorithm on your brokerage account. The deployment failures can occur from a) No brokerage account mapped to the strategy. b) In-correct broker/ API credentials. c) Lack of margin in a brokerage account to run the algorithm (Refer: Minimum Margin), d) Technical failures such as system outages, etc. RAIN trader will attempt to run the algorithm every day until as long as the deployment status is set to 'pause' by you.",
		Approach:
			"Found on the left on the blue ribbon, the approach classifies if the algorithms broader theme.",
		Style:
			"Found on the center of the blue ribbon, the style classifies the algorithms style based on the trading pattern. Is it capable of intended to carry out intraday trades, positional trades or multi-strategy.",
		Instruments:
			"Found on the right of the blue ribbon, the instruments denotes what are the securities that the algorithm will trade.",
		"Cum Returns":
			" Denotes the total % return gained or lost by running the algorithm since inception. The return is calculated as a percentage of the Total Subscription Value of the strategy.",
		"Daily. Return":
			"Denotes the total % return gained or lost by running the algorithm on the previous trading day. The return is calculated as a percentage of the Total Subscription Value of the strategy.",
	},
	"Portfolio Watch Card Summary": {
		Title: "Algorithm cards provide you with a brief about the algorithm.",
		"Algorithm Name":
			"The name of the algorithm is captured in blue text across the top-left of the card.",
		"Deploy Button":
			"The deploy button allows you to pause or deploy an algorithm on your account. An instruction to the effect will be updated only on the next trading day, prior to market open",
		"Deployment Status":
			"Red: Suggests the algorithm is not running on your specified brokerage account. This status occurs either when you pause the deployment of an algorithm or when there is a failure in deploying the algorithm on your brokerage account. The deployment failures can occur from a) No brokerage account mapped to the strategy. b) In-correct broker/ API credentials. c) Lack of margin in a brokerage account to run the algorithm (Refer: Minimum Margin), d) Technical failures such as system outages, etc. RAIN trader will attempt to run the algorithm every day until as long as the deployment status is set to 'pause' by you.",
		Approach:
			"Found on the left on the blue ribbon, the approach classifies if the algorithms broader theme.",
		Style:
			"Found on the center of the blue ribbon, the style classifies the algorithms style based on the trading pattern. Is it capable of intended to carry out intraday trades, positional trades or multi-strategy.",
		Instruments:
			"Found on the right of the blue ribbon, the instruments denotes what are the securities that the algorithm will trade.",
		"Cum. Returns":
			"Denotes the total % return gained or lost by running the algorithm since inception. The return is calculated as a percentage of the Total Subscription Value of the strategy.",
		"Daily. Return":
			"Denotes the total % return gained or lost by running the algorithm on the previous trading day. The return is calculated as a percentage of the Total Subscription Value of the strategy.",
	},

	"Market Place Card Summary": {
		Title: "Algorithm cards provide you with a brief about the algorithm.",
		"Algorithm Name":
			"The name of the algorithm is captured in blue text across the top-left of the card.",
		Approach:
			"Found on the left on the blue ribbon, the approach classifies if the algorithms broader theme.",
		Style:
			"Found on the center of the blue ribbon, the style classifies the algorithms style based on the trading pattern. Is it capable of intended to carry out intraday trades, positional trades or multi-strategy.",
		Instruments:
			"Found on the right of the blue ribbon, the instruments denotes what are the securities that the algorithm will trade.",
		"Minimum Subscription":
			"Denotes the minimum value of capital for which you can subscribe to the strategy .",
		Producer: "The producer that has built and maintains the algorithm.",
		"Risk Profile":
			"The risk associated with the strategy basis a number of factors such as leverage, execution complexity, etc., The risk-profile does not suggest the suitability of the strategy financial risk tolerance perspective.",
	},

	"Market Place Summary": {
		Title: "An overview of the algorithm and its features",
		"Minimum Subscription Value":
			"Denotes the minimum value of capital for which you can subscribe and use the algorithm. ",
		"Additional Subscription Value":
			"Denotes the minimum value of capital for which you can subscribe to an additional unit of the algorithm.",
		"Minimum Margin":
			"Denotes the minimum utilized margin required in your brokerage account for the algorithm to run on your account.",
		"1 Year Return":
			"Denotes the theoretical return generated by the algorithm either by way of backtesting of forward-test or by live deployment. This number is calculated as a percentage of the minimum subscription value net of trading costs(STT etc.) and slippage buffers, gross of brokerage cost.",
	},
};
