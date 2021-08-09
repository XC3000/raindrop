/** @format */

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { useSelector } from "react-redux";

export default function HistoryChart({ cardType }) {
	const chartData = useSelector((state) => state?.appData?.staticChartData);
	const error = useSelector((state) => state?.appError?.staticChartData);
	const darkTheme = useSelector(
		(state) => state?.changeThemeReducer?.darkTheme,
	);
	useEffect(() => {
		const Xdata = chartData?.map((item) => item["date"]);
		const statistic = chartData?.map((item) => item["statistic"]);
		const statistic_b = chartData?.map((item) => item["statistic_b"]);
		setData({
			xAxisData: Xdata,
			statistic: statistic,
			statistic_b: statistic_b,
		});
	}, [cardType, chartData, error]);
	const [data, setData] = useState({
		xAxisData: [],
		statistic: [],
		statistic_b: [],
	});
	const series = [
		{
			name: "Nav",
			type: "line",
			data: data?.statistic,
		},
	];
	const options = {
		chart: {
			id: "historyChart",
			height: 350,
			type: "line",
		},
		stroke: {
			show: true,
			width: 2,
			curve: "smooth",
		},
		xaxis: {
			type: "datetime",
			categories: data?.xAxisData,
			tickPlacement: "on",
			labels: {
				style: {
					colors: darkTheme ? "#CACACA" : "#4F4F4F",
				},
				rotateAlways: false,
				rotate: 0,
			},
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
			colors: ["#FFA41B"],
			strokeColors: "#fff",
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
