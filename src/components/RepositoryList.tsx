import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Repository } from "../api/github";

interface RepositoryListProps {
	repositories: Repository[];
	page: number;
	pageCount: number;
	onPageChange: (page: number) => void;
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
		<div className="w-full">
			<DataGrid
				rows={repositories}
				columns={columns}
				pagination
				initialState={{
					pagination: {
						paginationModel: { pageSize: 10 }, // Set the default page size to 10
					},
				}}
				pageSizeOptions={[10, 20, 30]} // Options for user to change the page size
			/>
		</div>
	);
};

export default RepositoryList;
