import Repo from './Repo';

const Repos = ({ repos }) => {
  if (!repos) return null;

  return (
    <div className="w-full md:flex md:justify-center">
      <div className="bg-glass w-full rounded-lg px-8 py-6">
        <ol className="relative border-s border-gray-200">
          {repos.length > 0 ? (
            repos.map((repo) => <Repo key={repo.id} repo={repo} />)
          ) : (
            <p className="flex h-32 items-center justify-center ">
              No repos found
            </p>
          )}
        </ol>
      </div>
    </div>
  );
};
export default Repos;
