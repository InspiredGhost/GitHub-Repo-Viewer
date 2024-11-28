import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Repository } from "../api/github";

interface RepositoryListProps {
	repositories: Repository[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
	const columns: GridColDef[] = [
		{
			field: "name",
			headerName: "Name",
			width: 200,
			renderCell: (params) => (
				<Link to={`/repository/${params.row.owner.login}/${params.value}`} className="text-blue-500 hover:underline">
					{params.value}
				</Link>
			),
		},
		{ field: "stargazers_count", headerName: "Stars", width: 130 },
		{ field: "forks_count", headerName: "Forks", width: 130 },
		{
			field: "open_issues_count",
			headerName: "Open Issues",
			width: 150,
			renderCell: (params) => (
				<Link to={`/issues/${params.row.owner.login}/${params.row.name}`} className="text-blue-500 hover:underline">
					{params.value}
				</Link>
			),
		},
	];

	return (
		<div className="w-full h-96">
			<DataGrid rows={repositories} columns={columns} pagination pageSizeOptions={[10, 20, 30]} />
		</div>
	);
};

export default RepositoryList;
