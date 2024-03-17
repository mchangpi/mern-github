const SortRepos = ({ onSort, sortType }) => {
  const BUTTONS = [
    { type: 'recent', text: 'Most Recent' },
    { type: 'stars', text: 'Most Stars' },
    { type: 'forks', text: 'Most Forks' },
  ];

  return (
    <div className="mb-2 flex justify-center">
      {BUTTONS.map((button) => (
        <button
          key={button.type}
          type="button"
          className={`bg-glass border-1 mb-2 me-2 rounded-lg px-5 py-2.5 text-xs font-medium focus:outline-none sm:text-sm ${
            button.type == sortType ? 'border-b-2 border-cyan-200' : ''
          }`}
          onClick={() => onSort(button.type)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};
export default SortRepos;
