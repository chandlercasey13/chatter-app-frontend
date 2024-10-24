import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import ChatLog from "./ChatLog";
import SearchUserBtn from "./SearchUserButton";
import SearchUser from "./SearchUser";
import { useParams } from "react-router-dom";
import * as chatService from "../../../services/chatService";
import { Link } from "react-router-dom";
import Sidebar from "../../DisplayChats";
import { GiConsoleController } from "react-icons/gi";

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
      
      if(user){
      const allUserChats = await chatService.getUserChats(userId);
      
      setUserChats([...userChats, allUserChats]);
      }
    };
    getUserChats(userId);
  }, []);
  



  return (
    <div className="chat-left-navbar ">
      
   
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

      {openSearchBox &&  <SearchUser user={user} onClose={onClose} />}



{userChats.length > 0 &&  (<ul className="chatlogs-left-navbar">
       
       {userChats[0]?.map((chats, i) => (
         <li key={i} className="chatlogs-left-li">
           {" "}
          
           <Link className="chatlogs-left-li-button"
             to={`/chatlogs/${chats._id}/user/${
               chats?.participants[0]?._id === user._id
                 ? chats?.participants[1]?._id
                 : chats?.participants[0]?._id
             }/${chats?.participants[0]?.username === user.username
               ? chats?.participants[1]?.username
               : chats?.participants[0]?.username} `}
             
           >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAArhJREFUWEfdWFFyqzAMxAy5R3oPSMtJmpwk7UmanARe4B7NPULwQ4zNCCHLgq9M/VPSYGu1Wq/lmOTFhnkxPMnfANQ0zYe1dm+M+TTG7OEZmDbG3K219yRJ6q7rrmVZwvOqsYqh2+12TNP07AEoItXW2uvz+ay14FSAgJEkSc5D5vB3ywDGThpQUUAOTEVRDKW69H3/D2dfVdU+y7KxlACeMmmtPR0Oh4uUkQiobdufQRNHvIBmUf9+0zTnQVdHAuyrKIrvEKggINCLMeYHTayLoijX1gtY2+12lRYUC4gpEwsGGHC6+sA7jGOAsj3swjdOUyygtm1/UUYLME4rwB4rcgD3eDxKGhCvG3pnAchl/eV9Jc/zN1qmpmlA5OKOg4B0Li0fp8cFIMLOQoCMtsZ3HGuwu8ZkYHABYwnPALlFf7XscAEJYFZ7OGmqpRkgjB4yDYhz0hcnTE1SROCzOBTQpI2Q30jZIf+x/nlIaiELicXZy8pgWNCixsDN8zw/0U0hsUgZEjODhXF2znsua0QdY3E1QzEP0ji7miFNySBgDFTI9DxYNSBseLFDFPkOGGT06MA6IkfTzBqC2z4kSE6g9H+xvkeyFwoIsp16n9ABqOgcxU5xADRtHtEYIVPp6Ai0EsGOhNPSqqMDViZ0Jj4DLESMAIKSBm5s+PEQ1lj4mKr9gH6YNlmS6GlJPVNZlk0tC9cNjGcoxzctjTNAnHlZFEUdrJWzBpyEdo1gC0tLh4KLPTHZ3tBRTu2I/05iV2zyOVCwmPaeFZov3Tw01yA2S/ApuARC1l3X3cF7/I02TdN3elsJNWy07FFAbueBE8OVaLGDJB3575x+TjHdBUUdCqIwxNlUANL3/XfscjizEU2G9B13Fr27M2xkzf34MP7Q4D5fNYxsKtkW0FvnqDS0dfEt814O0H/w3pJDIEKbTgAAAABJRU5ErkJggg=="/>
             {chats?.participants[0]?.username === user.username
               ? chats?.participants[1]?.username
               : chats?.participants[0]?.username}{" "}
           </Link>
           
          
         </li>
       ))}
     </ul>  )}
      
    </div>
  );
};

export default ChatBar;
