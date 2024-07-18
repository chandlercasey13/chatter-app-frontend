import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import ChatLog from "./ChatLog";
import SearchUserBtn from "./SearchUserButton";
import SearchUser from "./SearchUser";
import { useParams } from "react-router-dom";
import * as chatService from "../../../services/chatService"
import { Link } from "react-router-dom";

const ChatBar = ({user}) => {
  const [allUsers, setAllUsers] = useState([]);
  const [openSearchBox, setOpenSearchBox] = useState(false);
const [userChats, setUserChats] = useState([])
  const onOpen = () => {
    setOpenSearchBox(true);
  };
  const onClose = () => {
    setOpenSearchBox(false);
  };


const userId = user._id


useEffect(()=> {
  const getUserChats = async function (userId){
    const allUserChats = await chatService.getUserChats(userId)

      setUserChats([...userChats, allUserChats])
    }
    getUserChats(userId)
    
}, [])



  return (
    <div className="rounded-lg border-purple-700 bg-purple-200 p-4 w-40 flex flex-col">
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
      <ul>
      {openSearchBox && <SearchUser user ={user} onClose={onClose} />}
      {userChats[0]?.map((chats) => (
<li> <Link>{ chats._id} </Link></li>
      ))}
      </ul>
    </div>
  );
};

export default ChatBar;
