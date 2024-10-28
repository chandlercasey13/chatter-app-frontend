import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import { HiOutlinePencilSquare } from "react-icons/hi2";


const SearchUserBtn = ({ onOpen }) => {
  return (
    <div className="search-user-button-container">

<p className="pl-2 text-2xl  ">Chats</p>

    <button
      type="submit"
      className="search-user-button"
      onClick={onOpen}
    >
      
      <HiOutlinePencilSquare  className="w-1/3 h-full" />
    </button>
    </div>
  );
};

export default SearchUserBtn;
