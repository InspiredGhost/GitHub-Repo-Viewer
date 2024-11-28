import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRepositoryDetails, getContributors, getLanguages, getCommits, Repository, Contributor, Language, Commit } from '../api/github';
import RepositoryDetails from '../components/RepositoryDetails';
import ContributorsList from '../components/ContributorsList';
import LanguagesChart from '../components/LanguagesChart';
import CommitsList from '../components/CommitsList';

const RepositoryPage: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      if (owner && repo) {
        const details = await getRepositoryDetails(owner, repo);
        setRepository(details);
      }
    };

    const fetchContributors = async () => {
      if (owner && repo) {
        const repoContributors = await getContributors(owner, repo);
        setContributors(repoContributors);
      }
    };

    const fetchLanguages = async () => {
      if (owner && repo) {
        const repoLanguages = await getLanguages(owner, repo);
        setLanguages(repoLanguages);
      }
    };

    const fetchCommits = async () => {
      if (owner && repo) {
        const repoCommits = await getCommits(owner, repo);
        setCommits(repoCommits);
      }
    };

    if (owner && repo) {
      fetchRepositoryDetails();
      fetchContributors();
      fetchLanguages();
      fetchCommits();
    }
  }, [owner, repo]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        {repository && <RepositoryDetails repository={repository} />}
        <ContributorsList contributors={contributors} />
        <LanguagesChart languages={languages} />
        <CommitsList commits={commits} />
      </div>
    </div>
  );
};

export default RepositoryPage;
