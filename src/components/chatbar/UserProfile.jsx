import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import * as chatService from "../../../services/chatService";
import {  Route, Routes, useNavigate } from "react-router-dom";
import {Avatar, AvatarImage, AvatarFallback} from "../ui/avatar.jsx"

const UserProfile = ({ user, founduser, onClose, refreshUserChats , setSideBarOpen, handleOpenSideBar }) => {

  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;
 




  const handleClick = async (e) => {
   
 
    const newChat = await chatService.create(founduser, user); 
    
console.log(newChat)
    navigate(`/chatlogs/${newChat?._id}/user/${founduser?._id}/${founduser?.username} `);
    onClose();
    refreshUserChats(user._id);
    // handleOpenSideBar()
  };

  return (
   <button
      onClick={handleClick}
      className="flex items-center w-[97%]   gap-3 p-2 lg:p-4 border border-transparent border-b-slate-300 hover:border hover:border-blue-400 hover:bg-blue-100 rounded cursor-pointer">
     
      <div>
      <Avatar>
      <AvatarImage   src={`${BACKEND_URL}/users/${
             founduser?._id
            }/images`  } alt="@shadcn" />
      <AvatarFallback>{founduser.username.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>

      
        
      </div>
      <div className="font-semibold text-ellipsis line-clamp-1">
        {founduser?.username}
      </div>
      </button>
  );
};

export default UserProfile;
