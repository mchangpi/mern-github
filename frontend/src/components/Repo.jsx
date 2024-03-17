import { FaCodeBranch, FaCopy, FaRegStar } from 'react-icons/fa';
import { FaCodeFork } from 'react-icons/fa6';

import { formatDate } from '../utils/functions';
import { PROGRAMMING_LANGUAGES_ICONS } from '../utils/constants';
import toast from 'react-hot-toast';

const Repo = ({ repo }) => {
  if (!repo) return null;

  const formattedDate = formatDate(repo.created_at) || 'n/a';

  const handleCloneClick = async (repo) => {
    try {
      await navigator.clipboard.writeText(repo.clone_url);
      toast.success('Repo URL cloned to clipboard');
    } catch (error) {
      toast.error('Clipboard write failed. ');
    }
  };

  // console.log('clone url', repo.clone_url);

  return (
    <li className="mb-10 ms-7">
      <span
        className="absolute -start-3 flex h-6 w-6 items-center justify-center
    rounded-full bg-blue-100 ring-8 ring-white"
      >
        <FaCodeBranch className="h-5 w-5 text-blue-800" />
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          {repo.name}
        </a>
        <span
          className="flex items-center gap-1 rounded-full bg-yellow-100
        px-2.5 py-0.5 text-xs font-medium text-yellow-800"
        >
          <FaRegStar /> {repo.stargazers_count}
        </span>
        <span
          className="flex items-center gap-1 rounded-full
         bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800"
        >
          <FaCodeFork /> {repo.forks_count}
        </span>
        <span
          onClick={() => handleCloneClick(repo)}
          className="flex cursor-pointer items-center gap-1
        rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
        >
          <FaCopy /> Clone
        </span>
      </div>

      <time
        className="my-1 block text-xs font-normal leading-none
     text-stone-50"
      >
        Released on {formattedDate}
      </time>
      <p className="mb-4 text-base font-normal text-stone-100">
        {repo.description
          ? repo.description.slice(0, 500)
          : 'No description provided'}
      </p>
      {PROGRAMMING_LANGUAGES_ICONS[repo.language] ? (
        <img
          src={PROGRAMMING_LANGUAGES_ICONS[repo.language]}
          alt="Programming language icon"
          className="h-8"
        />
      ) : null}
    </li>
  );
};
export default Repo;
