import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import ChatLog from "./ChatLog";
import SearchUserBtn from "./SearchUserButton";
import SearchUser from "./SearchUser";
import { useParams } from "react-router-dom";
import * as chatService from "../../../services/chatService";
import { Link } from "react-router-dom";
import Sidebar from "./DisplayChats";

const ChatBar = ({ user }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [userChats, setUserChats] = useState([]);
  const onOpen = () => {
    setOpenSearchBox(true);
  };
  const onClose = () => {
    setOpenSearchBox(false);
  };

  const userId = user._id;

  useEffect(() => {
    const getUserChats = async function (userId) {
      const allUserChats = await chatService.getUserChats(userId);

      setUserChats([...userChats, allUserChats]);
    };
    getUserChats(userId);
  }, []);

  console.log(userChats);

  return (
    <div className="rounded-lg border-purple-700 bg-purple-200 p-4 w-1/6 flex flex-col ">
      <SearchUserBtn onOpen={onOpen} />
      {openSearchBox ? <SearchUser /> : ""}
      <div className="divide-y-4 divde-slate-400/25"></div>
      <ChatLog />
      <div className="divide-y-4 divde-slate-400/25"></div>
      <div>
        {allUsers.length === 0 && (
          <div>
            <div className="text-slate-500">
              <p>Start new chat!</p>
            </div>
          </div>
        )}
      </div>

      {openSearchBox && <SearchUser user={user} onClose={onClose} />}

      <ul className="overflow-y-auto overflow-x-hidden">
        {userChats[0]?.map((chats) => (
          <li className="text-xs mt-5">
            {" "}
            <Link to={`/chatlogs/user/${chats._id} `} className="w-1 ">
              {chats.participants[0].username === user.username ? chats.participants[1].username : chats.participants[0].username}{" "}
            </Link>
            <button>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatBar;
