import React, { useState, useEffect } from "react";

const Sidebar = ({ user }) => {
  const [ displayChats, setDisplayChats ] = useState([]);

  useEffect(() => {
    getUserChats();
  }, []);

const getUserChats = async () => {
try {
const response = await fetch('/chatlogs/user');
if(!response.ok) {
    throw new Error('Failed to get chats')
}
const data = await response.json()
setDisplayChats(data);
} catch (error) {
    console.log(error)
}}


return (
    <div>
        <h2>ChitChats</h2>
        <ul>
            {displayChats.map((displayChat, index)=>
            
            <li key={displayChat._id}>
                {displayChat.participants.find(userId => userId !== user) && (
                    <div>
                        {displayChat.participants.find(userId => userId !== user)}
                    </div>
                )}
            </li>
            )}
        </ul>
    </div>
) 
}

export default Sidebar;

// import { useEffect, useState } from "react";
// import { CiSearch } from "react-icons/ci";
// import LoadingSpinner from "./LoadingSpinner";
// import UserProfile from "./UserProfile";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

// const DisplayChats = ({ onClose, user }) => {
//   const [chatLogs, setChatLogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [display, setDisplay] = useState('');
// //   const [search, setSearch] = useState("");

//   const handleDisplayChats = async () => {
//     const URL = `${BACKEND_URL}/chatlogs/user`;
//     try {
//       setLoading(true);
//       const response = await fetch(URL, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: display,
//         }),
//       });
//       const data = await response.json();

//       setLoading(false);
//       setDisplay(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     handleDisplayChats();
//   }, [display]);

//   return (
//     <div className="fixed top-20 bottom-0 left-0 right-0 text-slate-500 bg-slate-700 bg-opacity-30 p-3 overflow-auto scroll-auto">
//       <div className="w-full max-w-lg mx-auto mt-12 m-2">
//         <div className="bg-white rounded h-10 overflow-hidden flex">
//           <input
//             type="text"
//             placeholder="Search by username..."
//             className="w-full outline-none py-1 h-full px-4"
//             onChange={(e) => setSearch(e.target.value)}
//             value={search}
//           />
//           <div className="h-9 w-9 flex justify-center items-center">
//             <CiSearch size={25} />
//           </div>
//         </div>
//         <div className="bg-white mt-2 w-full rounded p-3">
//           {searchUser.length === 0 && (
//             <p className="text-left text-slate-500">User Does Not Exist</p>
//           )}
//           {loading && (
//             <p>
//               <LoadingSpinner />
//             </p>
//           )}
//           {searchUser.length !== 0 &&
//             !loading &&
//             searchUser.map((founduser, index) => {
//               return (
//                 <UserProfile
//                   key={founduser._id}
//                   user={user}
//                   founduser={founduser}
//                   onClose={onClose}
//                 />
//               );
//             })}
//         </div>
//       </div>
//       <div
//         className="absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white"
//         onClick={onClose}
//       >
//         <button>
//           <IoIosCloseCircleOutline />
//         </button>
//       </div>
//     </div>
//   );
// };
// export default SearchUser;
