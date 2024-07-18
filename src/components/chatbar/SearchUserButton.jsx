import { BiSolidMessageSquareAdd } from "react-icons/bi";

const SearchUserBtn = ({ onOpen }) => {
  return (
    <button
      type="submit"
      className="btn rounded text-purple-600"
      onClick={onOpen}
    >
      <BiSolidMessageSquareAdd className="w-20 h-10" />
    </button>
  );
};

export default SearchUserBtn;
