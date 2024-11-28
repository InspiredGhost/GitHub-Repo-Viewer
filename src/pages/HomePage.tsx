import React, { useState } from "react";
import Search from "../components/Search";
import RepositoryList from "../components/RepositoryList";
import Loader from "../components/Loader";
import { searchRepositories, Repository } from "../api/github";

const HomePage: React.FC = () => {
	const [repositories, setRepositories] = useState<Repository[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const handleSearch = async (query: string) => {
		setLoading(true);
		const repos = await searchRepositories(query);
		setRepositories(repos);
		setLoading(false);
	};

	return (
		<div className="container mx-auto p-4">
			<div className="bg-white shadow-md rounded-lg p-6">
				<h2 className="text-3xl font-bold mb-4">Search GitHub Repositories</h2>
				<Search onSearch={handleSearch} />
				{loading ? (
					<Loader />
				) : (
					<div className="mt-4">
						<RepositoryList repositories={repositories} />
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
