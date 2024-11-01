import React, { useState, useEffect,useContext } from "react";
import Chat from "./Chat";
import ChatLog from "./ChatLog";
import SearchUserBtn from "./SearchUserButton";
import SearchUser from "./SearchUser";
import { useParams } from "react-router-dom";
import * as chatService from "../../../services/chatService";
import { Link, useNavigate } from "react-router-dom";
import * as messageService from "../../../services/messageService"
import Sidebar from "../../DisplayChats";
import { GiConsoleController } from "react-icons/gi";

import { ChatContext } from "../../context";
const ChatBar = ({ user }) => {
  const { previewMessage, setPreviewMessage } = useContext(ChatContext);
  const [allUsers, setAllUsers] = useState([]);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [userChats, setUserChats] = useState(false);
  const [insideRoom, setSetInsideRoom] = useState(false);
  const {foundUserusername} =useParams();
  const navigate = useNavigate();
  const onOpen = () => {
navigate('/')
    setOpenSearchBox(true);
  };
  const onClose = () => {
    setOpenSearchBox(false);
  };



  const userId = user._id;
console.log(user)
useEffect(() => {
refreshUserChats(userId)
},[previewMessage])

    const refreshUserChats = async function (userId) {
      
      if(user){
        
      const allUserChats = await chatService.getUserChats(userId);
      
      setUserChats([ allUserChats]);
      }
      
      
    };
    
 


  const handleReadingMessages = async function (messageId) {
    
   await messageService.updateMessage(messageId)
   refreshUserChats(userId)
  }

  // useEffect(() => {
  //   const refreshUserChats = async () => {
  //     if (user) {
  //       const allUserChats = await chatService.getUserChats(userId);
  //       setUserChats(allUserChats); // Set userChats directly to the fetched data
  //     }
  //   };
  //   refreshUserChats(); // Call refreshUserChats when the component mounts
  // }, [userId]); // Add dependencies if necessary (e.g., if userId can change)

  // const handleReadingMessages = async (messageId) => {
  //   await messageService.updateMessage(messageId);
  //   refreshUserChats(); // Refresh chats after updating message
  // };








  return (
    <div className="chat-left-navbar ">
      
   
      <SearchUserBtn onOpen={onOpen} />
      
      <div className="divide-y-4 divde-slate-400/25"></div>
      <ChatLog />
      <div className="divide-y-4 divde-slate-400/25"></div>
      <div>
        {allUsers.length === 0 && (
          <div>
            <div className="text-slate-500">
             
            </div>
          </div>
        )}
      </div>

     



{userChats && userChats[0].length>0 &&  (<ul className="chatlogs-left-navbar">
       
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
               onClick={() => { if (chats.messages[0]) {handleReadingMessages(chats.messages[chats.messages.length-1]._id)}}}
             
           >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAArhJREFUWEfdWFFyqzAMxAy5R3oPSMtJmpwk7UmanARe4B7NPULwQ4zNCCHLgq9M/VPSYGu1Wq/lmOTFhnkxPMnfANQ0zYe1dm+M+TTG7OEZmDbG3K219yRJ6q7rrmVZwvOqsYqh2+12TNP07AEoItXW2uvz+ay14FSAgJEkSc5D5vB3ywDGThpQUUAOTEVRDKW69H3/D2dfVdU+y7KxlACeMmmtPR0Oh4uUkQiobdufQRNHvIBmUf9+0zTnQVdHAuyrKIrvEKggINCLMeYHTayLoijX1gtY2+12lRYUC4gpEwsGGHC6+sA7jGOAsj3swjdOUyygtm1/UUYLME4rwB4rcgD3eDxKGhCvG3pnAchl/eV9Jc/zN1qmpmlA5OKOg4B0Li0fp8cFIMLOQoCMtsZ3HGuwu8ZkYHABYwnPALlFf7XscAEJYFZ7OGmqpRkgjB4yDYhz0hcnTE1SROCzOBTQpI2Q30jZIf+x/nlIaiELicXZy8pgWNCixsDN8zw/0U0hsUgZEjODhXF2znsua0QdY3E1QzEP0ji7miFNySBgDFTI9DxYNSBseLFDFPkOGGT06MA6IkfTzBqC2z4kSE6g9H+xvkeyFwoIsp16n9ABqOgcxU5xADRtHtEYIVPp6Ai0EsGOhNPSqqMDViZ0Jj4DLESMAIKSBm5s+PEQ1lj4mKr9gH6YNlmS6GlJPVNZlk0tC9cNjGcoxzctjTNAnHlZFEUdrJWzBpyEdo1gC0tLh4KLPTHZ3tBRTu2I/05iV2zyOVCwmPaeFZov3Tw01yA2S/ApuARC1l3X3cF7/I02TdN3elsJNWy07FFAbueBE8OVaLGDJB3575x+TjHdBUUdCqIwxNlUANL3/XfscjizEU2G9B13Fr27M2xkzf34MP7Q4D5fNYxsKtkW0FvnqDS0dfEt814O0H/w3pJDIEKbTgAAAABJRU5ErkJggg=="/>
             <div className="chat-contact">
              <div className="chat-contact-name">
             {chats?.participants[0]?.username === user.username
               ? chats?.participants[1]?.username
               : chats?.participants[0]?.username}{" "}
               </div>
               <div className="chat-contact-preview">

              {
                chats.messages.length > 0 && ( chats?.messages[chats.messages.length-1].message)
             
             }
               </div>
              
               </div>
               {
               
                 chats.messages && chats?.messages[chats.messages.length-1]?.read === false && chats.messages[chats.messages.length-1]?.senderId != user._id &&  ( <div className="chat-unread-dot">
<img src="data:image/png;base64,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"/>
</div>)}
              
           </Link>
           
          
         </li>
       ))}
     </ul>  )}
      
    </div>
  );
};

export default ChatBar;
