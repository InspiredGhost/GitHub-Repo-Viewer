import React, { useState } from "react";

interface SearchProps {
	onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
	const [query, setQuery] = useState("");

	const handleSearch = () => {
		if (query.trim()) {
			onSearch(query);
		}
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className="flex flex-col sm:flex-row justify-center mt-4">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyPress={handleKeyPress}
				className="border p-2 rounded-l sm:w-1/2 w-full"
				placeholder="Search GitHub Repositories"
			/>
			{query && (
				<button onClick={handleSearch} className="bg-blue-900 text-white p-2 rounded-r mt-2 sm:mt-0 sm:ml-2">
					Search
				</button>
			)}
		</div>
	);
};

export default Search;
