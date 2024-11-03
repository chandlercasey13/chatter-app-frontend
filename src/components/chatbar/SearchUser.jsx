import { useEffect, useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import LoadingSpinner from "./LoadingSpinner";
import UserProfile from "./ChatSearchProfile";
import { IoIosCloseCircleOutline } from "react-icons/io";
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const SearchUser = ({ onClose, user }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
        inputRef.current.focus();  // Focus the input on component mount
        inputRef.current.select();  // Select the text
    }
}, []);






  const handleSearchUser = async () => {


    
    const URL = `${BACKEND_URL}/messages/search-user`;
    try {
      setLoading(true);
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: search,
        }),
      });
      const data = await response.json();

      setLoading(false);
      setSearchUser(data.data);
    } catch (error) {
      console.log(error);
    }


   

  };

  
  useEffect(() => {
    handleSearchUser();
  }, [search]);

  return (
    <div className=" search-modal h-screen w-1/2 absolute top-0 bottom-0 left-0 right-0 text-slate-500   ">
      <div className="w-full max-w-3xl h-full rounded  mx-2  overflow-visible ">
       
       
       
        <div className="bg-white rounded h-10  flex items-center justify-center">
          <h1 className="flex items-center text-xl font-medium">
            To:
          </h1>
          <input
            type="text"
            ref={inputRef}
            className="w-full outline-none py-1 h-full px-4"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          
        </div>




<div className="w-full h-1/2  max-h-screen mt-2 p-2 pr-1  shadow-custom border-2 rounded-2xl">
        <div className="bg-white  w-full h-full overflow-auto scroll-auto">
          {searchUser.length === 0 && (
            <p className="text-left text-slate-500">User Does Not Exist</p>
          )}
          {loading && (
            <p>
              <LoadingSpinner />
            </p>
          )}
          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((founduser, index) => {
              return (
                <UserProfile
                  key={founduser._id}
                  user={user}
                  founduser={founduser}
                  onClose={onClose}
                />
              );
            })}
        </div>
        </div>
      </div>
      <div
        className="absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white"
        onClick={onClose}
      >
      
      </div>
    </div>
  );
};
export default SearchUser;
