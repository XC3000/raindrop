/** @format */

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { useSelector } from "react-redux";

function LiveChart({ cardType }) {
	const darkTheme = useSelector(
		(state) => state?.changeThemeReducer?.darkTheme,
	);
	const chartData = useSelector((state) => state?.livepnlChange?.liveChartData);
	const [newData, setnewData] = useState({ y: [], x: "" });

	useEffect(() => {
		if (chartData?.ydata && chartData?.time) {
			const y = chartData?.ydata.toFixed(2);
			const x = chartData?.time;
			setnewData({
				x: [...newData.x, x],
				y: [...newData.y, y],
			});
		}
	}, [cardType, chartData]);
	console.log(newData);
	const series = [
		{
			name: "Nav",
			type: "line",
			data:
				newData.y.length >= 10
					? newData?.y.slice(Math.max(newData?.y.length - 10, 1))
					: newData.y, //newData?.y, //data?.statistic
		},
	];
	const options = {
		chart: {
			id: "realtimepnl",
			height: 350,
			type: "line",
			animations: {
				enabled: true,
				easing: "linear",
				dynamicAnimation: {
					speed: 1000,
				},
			},
		},
		stroke: {
			show: true,
			width: 2,
			curve: "smooth",
		},
		xaxis: {
			type: "category", //"datetime",
			categories: newData.x, //newData?.x.slice(Math.max(newData?.x.length - 5, 1)), // data?.xAxisData,
			tickPlacement: "on",
			labels: {
				show: false,
				style: {
					colors: darkTheme ? "#CACACA" : "#4F4F4F",
				},
				// rotateAlways: false,
				// rotate: 0,
			},
			// hideOverlappingLabels: true,
			// tickAmount: 5,
		},
		fill: {
			type: "gradient",
			gradient: {
				shade: "dark",
				gradientToColors: ["#FDD835"],
				shadeIntensity: 1,
				type: "horizontal",
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100, 100, 100],
			},
		},
		markers: {
			size: 0,
			colors: ["#FFA500"],
			strokeColors: "#FFA500",
			strokeWidth: 2,
			hover: {
				size: 5,
			},
		},
		yaxis: {
			forceNiceScale: true,
			opposite: true,
			title: {
				text: "Nav",
			},
			// tickAmount: 5,
			labels: {
				style: {
					colors: darkTheme ? "#CACACA" : "#4F4F4F",
				},
			},
		},
		grid: {
			show: true,
			borderColor: darkTheme ? "#F5F5F510" : "#DCDCDC40",
			position: "back",
		},
	};

	return (
		<div>
			{chartData && (
				<Chart options={options} series={series} type="line" height={330} />
			)}
		</div>
	);
}

export default LiveChart;
