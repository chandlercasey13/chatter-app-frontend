import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search user or chat..."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-600 text-white">
        <CiSearch className="w-5 h-5 outline-none" />
      </button>
    </form>
  );
};

export default SearchBar;
