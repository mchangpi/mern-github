import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import ProfileInfo from '../components/ProfileInfo';
import Repos from '../components/Repos';
import Search from '../components/Search';
import SortRepos from '../components/SortRepos';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortType, setSortType] = useState('recent');

  const getUserProfileAndRepos = useCallback(asyncGetProfileAndRepos, []);
  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  async function asyncGetProfileAndRepos(username = 'mchangpi') {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/profile/${username}`,
      );
      const { profile, repos } = await res.json();

      //descending, recent first
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setUserProfile(profile);
      setRepos(repos);

      return { profile, repos };
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const onSearch = async (e, username) => {
    e.preventDefault();

    setLoading(true);
    setUserProfile(null);
    setRepos([]);

    const { profile, repos } = await getUserProfileAndRepos(username);

    setLoading(false);
    setUserProfile(profile);
    setRepos(repos);

    setSortType('recent');
  };

  const onSort = (sortType) => {
    let sortedRepos = repos.slice();
    if (sortType === 'recent') {
      sortedRepos.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      ); //descending, recent first
    } else if (sortType === 'stars') {
      sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count); //descending, most stars first
    } else if (sortType === 'forks') {
      sortedRepos.sort((a, b) => b.forks_count - a.forks_count); //descending, most forks first
    }
    setSortType(sortType);
    setRepos([...sortedRepos]);
  };

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className="flex flex-col items-start justify-center gap-4 md:flex-row">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <ProfileInfo userProfile={userProfile} />
            <Repos repos={repos} />
          </>
        )}
      </div>
    </div>
  );
};
export default HomePage;
