import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import IssuesList from "../components/IssuesList";
import PieChart from "../components/PieChart";
import { getIssues, Issue } from "../api/github";

const IssuesPage: React.FC = () => {
	const { owner, repo } = useParams<{ owner: string; repo: string }>();
	const [issues, setIssues] = useState<Issue[]>([]);
	const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
	const [status, setStatus] = useState<string>("all");

	useEffect(() => {
		const fetchIssues = async () => {
			if (owner && repo) {
				const repoIssues = await getIssues(owner, repo);
				setIssues(repoIssues);
				setFilteredIssues(repoIssues);
			}
		};

		fetchIssues();
	}, [owner, repo]);

	useEffect(() => {
		if (status === "all") {
			setFilteredIssues(issues);
		} else {
			setFilteredIssues(issues.filter((issue) => issue.state === status));
		}
	}, [status, issues]);

	const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setStatus(event.target.value);
	};

	return (
		<div className="container mx-auto p-4">
			<div className="bg-white shadow-md rounded-lg p-6">
				<h2 className="text-3xl font-bold mb-4">Issues for {repo}</h2>
				<div className="mb-4">
					<label htmlFor="status" className="mr-2">
						Filter by status:
					</label>
					<select id="status" value={status} onChange={handleStatusChange} className="border rounded px-2 py-1">
						<option value="all">All</option>
						<option value="open">Open</option>
						<option value="closed">Closed</option>
					</select>
				</div>
				<IssuesList issues={filteredIssues} />
				<div className="mt-4">
					<h3 className="text-xl font-bold mb-2">Issues Breakdown</h3>
					<div className="w-full sm:w-1/2 mx-auto">
						<PieChart openIssues={issues.filter((issue) => issue.state === "open").length} closedIssues={issues.filter((issue) => issue.state === "closed").length} />
					</div>
				</div>
				<div className="mt-4">
					<Link to={`/repository/${owner}/${repo}`} className="inline-block bg-blue-900 text-white px-4 py-2 rounded">
						View to Repository
					</Link>
				</div>
			</div>
		</div>
	);
};

export default IssuesPage;
