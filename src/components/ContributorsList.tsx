import React from "react";
import { Contributor } from "../api/github";

interface ContributorsListProps {
	contributors: Contributor[];
}

const ContributorsList: React.FC<ContributorsListProps> = ({ contributors }) => {
	return (
		<div className="mt-4">
			<h3 className="text-xl font-bold">Top Contributors</h3>
			<ul className="flex flex-wrap">
				{contributors.map((contributor) => (
					<li key={contributor.id} className="w-1/4 p-2">
						<div className="bg-white shadow-md rounded-lg p-4">
							<img src={contributor.avatar_url} alt={contributor.login} className="w-16 h-16 rounded-full mx-auto" />
							<p className="text-center mt-2">{contributor.login}</p>
							<p className="text-center text-sm text-gray-600">{contributor.contributions} contributions</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ContributorsList;
