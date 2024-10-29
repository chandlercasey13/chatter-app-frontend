import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import * as chatService from "../../../services/chatService";
import {  Route, Routes, useNavigate } from "react-router-dom";
const UserProfile = ({ user, founduser, onClose }) => {

  const navigate = useNavigate();


 




  const handleClick = async (e) => {
   
    
    const newChat = await chatService.create(founduser, user); 
    
 
    navigate(`/chatlogs/${newChat._id}/user/${founduser?._id}/${founduser?.username} `);

    onClose()
  };

  return (
   <button
      onClick={handleClick}
      className="flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-300 hover:border hover:border-purple-400 hover:bg-purple-100 rounded cursor-pointer">
     
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
      </button>
  );
};

export default UserProfile;
