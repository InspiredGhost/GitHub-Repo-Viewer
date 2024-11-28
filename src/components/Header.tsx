import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
	return (
		<header className=" text-white p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">GitHub Repo Viewer</h1>
				<nav className="flex space-x-4">
					<Link to="/" className="text-blue-900e hover:underline">
						Home
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
