import React from "react";
import { Issue } from "../api/github";

interface IssuesListProps {
	issues: Issue[];
}

const IssuesList: React.FC<IssuesListProps> = ({ issues }) => {
	return (
		<div className="mt-4">
			<h3 className="text-xl font-bold">Issues</h3>
			<ul>
				{issues.map((issue) => (
					<li key={issue.id} className="border-b py-2">
						<a href={issue.html_url} className="text-blue-500">
							{issue.title}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default IssuesList;
