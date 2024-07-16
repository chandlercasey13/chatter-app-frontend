import { BiSolidMessageSquareAdd } from "react-icons/bi";

const SearchBar = () => {
  return (
    // <form className="flex items-center gap-2 text-l">
    //   <input
    //     type="text"
    //     placeholder="Search user or chat..."
    //     className="input input-bordered rounded-full"
    //   />
    <button type="submit" className="btn rounded text-purple-600">
      <BiSolidMessageSquareAdd className="w-20 h-10" />
    </button>
    // </form>
  );
};

export default SearchBar;
