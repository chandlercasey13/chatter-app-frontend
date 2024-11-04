import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import * as chatService from "../../../services/chatService";
import {  Route, Routes, useNavigate } from "react-router-dom";
const UserProfile = ({ user, founduser, onClose, refreshUserChats  }) => {

  const navigate = useNavigate();


 




  const handleClick = async (e) => {
   
 
    const newChat = await chatService.create(founduser, user); 
    

    navigate(`/chatlogs/${newChat._id}/user/${founduser?._id}/${founduser?.username} `);
    onClose();
    refreshUserChats(user._id);
    
  };

  return (
   <button
      onClick={handleClick}
      className="flex items-center w-[97%]   gap-3 p-2 lg:p-4 border border-transparent border-b-slate-300 hover:border hover:border-blue-400 hover:bg-blue-100 rounded cursor-pointer">
     
      <div>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAArhJREFUWEfdWFFyqzAMxAy5R3oPSMtJmpwk7UmanARe4B7NPULwQ4zNCCHLgq9M/VPSYGu1Wq/lmOTFhnkxPMnfANQ0zYe1dm+M+TTG7OEZmDbG3K219yRJ6q7rrmVZwvOqsYqh2+12TNP07AEoItXW2uvz+ay14FSAgJEkSc5D5vB3ywDGThpQUUAOTEVRDKW69H3/D2dfVdU+y7KxlACeMmmtPR0Oh4uUkQiobdufQRNHvIBmUf9+0zTnQVdHAuyrKIrvEKggINCLMeYHTayLoijX1gtY2+12lRYUC4gpEwsGGHC6+sA7jGOAsj3swjdOUyygtm1/UUYLME4rwB4rcgD3eDxKGhCvG3pnAchl/eV9Jc/zN1qmpmlA5OKOg4B0Li0fp8cFIMLOQoCMtsZ3HGuwu8ZkYHABYwnPALlFf7XscAEJYFZ7OGmqpRkgjB4yDYhz0hcnTE1SROCzOBTQpI2Q30jZIf+x/nlIaiELicXZy8pgWNCixsDN8zw/0U0hsUgZEjODhXF2znsua0QdY3E1QzEP0ji7miFNySBgDFTI9DxYNSBseLFDFPkOGGT06MA6IkfTzBqC2z4kSE6g9H+xvkeyFwoIsp16n9ABqOgcxU5xADRtHtEYIVPp6Ai0EsGOhNPSqqMDViZ0Jj4DLESMAIKSBm5s+PEQ1lj4mKr9gH6YNlmS6GlJPVNZlk0tC9cNjGcoxzctjTNAnHlZFEUdrJWzBpyEdo1gC0tLh4KLPTHZ3tBRTu2I/05iV2zyOVCwmPaeFZov3Tw01yA2S/ApuARC1l3X3cF7/I02TdN3elsJNWy07FFAbueBE8OVaLGDJB3575x+TjHdBUUdCqIwxNlUANL3/XfscjizEU2G9B13Fr27M2xkzf34MP7Q4D5fNYxsKtkW0FvnqDS0dfEt814O0H/w3pJDIEKbTgAAAABJRU5ErkJggg=="/>
        
      </div>
      <div className="font-semibold text-ellipsis line-clamp-1">
        {founduser?.username}
      </div>
      </button>
  );
};

export default UserProfile;
