
import React, {useState} from "react";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import * as chatService from "../../../services/chatService"






const UserProfile = ({ user, founduser, onClose }) => {
 
const [chatParticipants, setChatParticipants] = useState([])

const handleClick = async (e) => {
  
   e.preventDefault()
   setChatParticipants([])
  if (user,founduser){
  
} else {return}





  // onClose()
}

  return (

    <Link


      to={`/chatlogs/${founduser?._id}/new  `}
      onClick={onClose}
      className="flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-300 hover:border hover:border-purple-400 hover:bg-purple-100 rounded cursor-pointer"
    >
      <div>
        <h1>Start a new Chat </h1>
        <UserAvatar
          width={50}
          height={50}
          name={founduser?.username}
          userId={founduser?._id}
        />
      </div>
      <div className="font-semibold text-ellipsis line-clamp-1">
        {founduser?.username}
      </div>
    </Link>

  );
};

export default UserProfile;
