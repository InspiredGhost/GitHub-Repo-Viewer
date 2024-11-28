import React from "react";
import { Link } from "react-router-dom";
import { Repository } from "../api/github";

interface RepositoryDetailsProps {
	repository: Repository;
}

const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({ repository }) => {
	return (
		<div className="mt-4 p-4 border rounded bg-gray-50">
			<h2 className="text-2xl font-bold">{repository.name}</h2>
			<p>{repository.description}</p>
			<p>
				URL:{" "}
				<a href={repository.html_url} className="text-blue-500">
					{repository.html_url}
				</a>
			</p>
			<p>Stars: {repository.stargazers_count}</p>
			<p>Forks: {repository.forks_count}</p>
			<p>Open Issues: {repository.open_issues_count}</p>
			<Link to={`/issues/${repository.owner.login}/${repository.name}`} className="mt-4 inline-block bg-blue-900 text-white px-4 py-2 rounded">
				View Issues
			</Link>
		</div>
	);
};

export default RepositoryDetails;
