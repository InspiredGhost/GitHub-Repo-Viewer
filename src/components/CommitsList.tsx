import React from "react";
import { Commit } from "../api/github";

interface CommitsListProps {
	commits: Commit[];
}

const CommitsList: React.FC<CommitsListProps> = ({ commits }) => {
	return (
		<div className="mt-4">
			<h3 className="text-xl font-bold">Recent Commits</h3>
			<ul>
				{commits.map((commit) => (
					<li key={commit.sha} className="border-b py-2">
						<p className="text-sm text-gray-600">{commit.commit.message}</p>
						<p className="text-sm text-gray-500">
							by {commit.commit.author.name} on {new Date(commit.commit.author.date).toLocaleDateString()}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CommitsList;
