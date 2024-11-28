import axios from "axios";

export interface Repository {
	id: number;
	name: string;
	owner: {
		login: string;
	};
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
	description: string;
	html_url: string;
}

export interface Contributor {
	id: number;
	login: string;
	avatar_url: string;
	contributions: number;
}

export interface Language {
	name: string;
	size: number;
}

export interface Commit {
	sha: string;
	commit: {
		message: string;
		author: {
			name: string;
			date: string;
		};
	};
}

export const searchRepositories = async (query: string, page: number = 1): Promise<Repository[]> => {
	const response = await axios.get(`https://api.github.com/search/repositories?q=${query}&page=${page}`);
	return response.data.items;
};

export const getRepositoryDetails = async (owner: string, repo: string): Promise<Repository> => {
	const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
	return response.data;
};

export const getContributors = async (owner: string, repo: string): Promise<Contributor[]> => {
	const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`);
	return response.data;
};

export const getLanguages = async (owner: string, repo: string): Promise<Language[]> => {
	const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`);
	const languages = Object.keys(response.data).map((key) => ({ name: key, size: response.data[key] }));
	return languages;
};

export const getCommits = async (owner: string, repo: string): Promise<Commit[]> => {
	const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`);
	return response.data;
};

export interface Issue {
	id: number;
	title: string;
	state: string;
	created_at: string;
	updated_at: string;
	closed_at: string | null;
	user: {
		login: string;
	};
	comments: number;
	html_url: string;
}

export const getIssues = async (owner: string, repo: string): Promise<Issue[]> => {
	const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues?state=all`);
	return response.data;
};
