import { BiSolidMessageSquareAdd } from "react-icons/bi";

const SearchUserBtn = ({ onOpen }) => {
  return (
    <div className="search-user-button-container">

<p>Chats</p>
    <button
      type="submit"
      className="search-user-button"
      onClick={onOpen}
    >
      <BiSolidMessageSquareAdd className="w-full h-full" />
    </button>
    </div>
  );
};

export default SearchUserBtn;
