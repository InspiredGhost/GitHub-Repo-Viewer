import React, { useState } from "react";
import Search from "../components/Search";
import RepositoryList from "../components/RepositoryList";
import Loader from "../components/Loader";
import { searchRepositories, Repository } from "../api/github";

const HomePage: React.FC = () => {
	const [repositories, setRepositories] = useState<Repository[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const [query, setQuery] = useState<string>("");
	const [pageCount, setPageCount] = useState<number>(1);

	const handleSearch = async (searchQuery: string) => {
		setLoading(true);
		setQuery(searchQuery);
		const repos = await searchRepositories(searchQuery, 1);
		setRepositories(repos);
		setPage(1);
		setPageCount(Math.ceil(676647 / 30)); // Assuming 30 results per page
		setLoading(false);
	};

	const handlePageChange = async (newPage: number) => {
		setLoading(true);
		const repos = await searchRepositories(query, newPage);
		setRepositories(repos);
		setPage(newPage);
		setLoading(false);
	};
	const handleLoadMore = async () => {
		setLoading(true);
		const nextPage = page + 1;
		const repos = await searchRepositories(query, nextPage);
		setRepositories((prevRepos) => [...prevRepos, ...repos]);
		setPage(nextPage);
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
						<RepositoryList repositories={repositories} page={page} pageCount={pageCount} onPageChange={handlePageChange} />{" "}
						{repositories.length > 0 && (
							<button onClick={handleLoadMore} className="bg-blue-900 text-white px-4 py-2 rounded mt-4">
								{" "}
								Load More{" "}
							</button>
						)}{" "}
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
