import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
	openIssues: number;
	closedIssues: number;
}

const PieChart: React.FC<PieChartProps> = ({ openIssues, closedIssues }) => {
	const data = {
		labels: ["Open Issues", "Closed Issues"],
		datasets: [
			{
				data: [openIssues, closedIssues],
				backgroundColor: ["#FF6384", "#36A2EB"],
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
	};

	return (
		<div className="relative h-64">
			<Pie data={data} options={options} />
		</div>
	);
};

export default PieChart;
