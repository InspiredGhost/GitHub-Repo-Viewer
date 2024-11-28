import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Language } from "../api/github";

ChartJS.register(ArcElement, Tooltip, Legend);

interface LanguagesChartProps {
	languages: Language[];
}

const LanguagesChart: React.FC<LanguagesChartProps> = ({ languages }) => {
	const data = {
		labels: languages.map((lang) => lang.name),
		datasets: [
			{
				data: languages.map((lang) => lang.size),
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
	};

	return (
		<div className="relative h-64 mt-4">
			<h3 className="text-xl font-bold mb-2">Languages Used</h3>
			<Pie data={data} options={options} />
		</div>
	);
};

export default LanguagesChart;
