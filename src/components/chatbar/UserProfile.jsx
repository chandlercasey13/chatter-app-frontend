import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import * as chatService from "../../../services/chatService";

const UserProfile = ({ user, founduser, onClose }) => {
  const [chatId, setChatId] = useState('')

  const handleClick = async (e) => {
    e.preventDefault();
    const newChat = await chatService.create(founduser, user); 
    setChatId(newChat._id)
    onClose()
  };

  return (
    <Link
      to={`/chatlogs/${chatId}/user/${founduser?._id} `}
      onClick={handleClick}
      className="flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-300 hover:border hover:border-purple-400 hover:bg-purple-100 rounded cursor-pointer"
    >
      <div>
        <UserAvatar
          width={50}
          height={50}
          name={founduser?.username}
          userId={founduser?._id}
        />
        <p>Start a new Chat</p>
      </div>
      <div className="font-semibold text-ellipsis line-clamp-1">
        {founduser?.username}
      </div>
    </Link>
  );
};

export default UserProfile;
