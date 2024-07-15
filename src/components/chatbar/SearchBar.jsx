const SearchBar = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search user or chat..."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-oval bg-sky-500 text-white">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
