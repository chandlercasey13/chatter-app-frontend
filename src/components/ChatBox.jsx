import React, { useEffect, useState, useRef, useContext } from "react";
import { socket } from "../socket";
import * as chatService from "../../services/chatService";
import * as messageService from "../../services/messageService";
import useChats from "../zustand/useChatLogs";
import UserProfile from "./chatbar/UserProfile";
import { useParams } from "react-router-dom";
import UserAvatar from "./chatbar/UserAvatar";
import { ChatContext } from "../context";
import SearchUser from "./chatbar/SearchUser";
import { data } from "autoprefixer";
import {Avatar, AvatarImage, AvatarFallback} from "../components/ui/avatar"
function ChatBox({ user, openSearchBox, onClose, refreshUserChats }) {
  const [textInputData, setTextInputData] = useState({
    senderId: [{ username: user.username }],
    message: "",
  });
  const [databaseMessageLog, setDatabaseMessageLog] = useState([]);
  const [messageLog, setMessageLog] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [currentRoom, setCurrentRoom] = useState("");
  const [chatParticipant, setChatParticipant] = useState({});
  const [key, setKey] = useState(-1);

  const { userId } = useParams();
  const { foundUserId } = useParams();
  const { foundUserusername } = useParams();
  const { chatId } = useParams();

  const { previewMessage, setPreviewMessage } = useContext(ChatContext);
  const inputRef = useRef(null);
  const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

  
  useEffect(() => {
  
    const handleChatChange = async function (newChatId) {
      const chatMessages = await chatService.getChatMessages(newChatId);

      setDatabaseMessageLog(chatMessages?.messages);
    };

    const handleRoomChange = function (newRoom) {
      if (currentRoom) {
        socket.emit("leave", currentRoom, user.username);
      }

      socket.emit("join", newRoom, user.username);
      setCurrentRoom(newRoom);
    };

    if (inputRef.current && window.visualViewport<770) {
      inputRef.current.focus(); 
      inputRef.current.select(); 
    }



    if (foundUserId && foundUserId != 'undefined') {
      
    handleRoomChange(chatId);
    handleChatChange(chatId);}
  }, [foundUserId]);

  const messageListener = async (messagecontent) => {
    setMessageLog((prevMessageLog) => [...prevMessageLog, messagecontent]);

    setPreviewMessage(messagecontent);
  };

  const offlineMessageListener = async (messagecontent, chatID) => {
    setTimeout(() => setPreviewMessage(["otherRoom", foundUserusername]), 1000);
  };

 




  useEffect(() => {
    socket.on("refreshChatLog", offlineMessageListener);

    socket.on("message", messageListener);
   

    return () => socket.off("message", messageListener);
  }, []);



  function handleTextInput(event) {
    setTextInputData({
      ...textInputData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleButtonSubmit(e) {
    e.preventDefault();

    //move to list of users, includes logic that checks for already existing chat between participants

    setMessageLog([...messageLog, textInputData]);

    socket.emit(
      "message",
      {
        senderId: [{ username: user.username }],
        message: textInputData.message,
      },
      currentRoom,
      chatId
    );

    const newMessage = await messageService.create(textInputData);

    const updateChat = await chatService.update(chatId, newMessage._id);

    setPreviewMessage(textInputData);
    setTextInputData({ senderId: [{ username: user.username }], message: "" });
  }

  async function handleDeleteButtonSubmit(
    usermessageObject,
    userMessageObjectIndex
  ) {
    await messageService.deleteMessage(usermessageObject._id);

    const filteredLog = messageLog.filter((usermessageObject, index) => {
      return index != userMessageObjectIndex;
    });

    setMessageLog(filteredLog);
  }

  
  return (
    <>
      <header className="top-chat-name-container border-gray-250 border-y-2 border-t-0 ">
        {!openSearchBox ? (
          <h1 className="top-chat-name">{
           foundUserusername
            }
            </h1>
        ) : (
          <SearchUser
            user={user}
            onClose={onClose}
            refreshUserChats={refreshUserChats}
          />
        )}
        
      </header>
      <div className="chat-window-right-panel-chat-container-overflow">
        {
          <>
            <ul className="state-ul">
              {messageLog?.map((userMessageObject, index) => (
                <div
                  key={index + 1}
                  className={`chat-right-panel-text-containers  flex items-center ${
                    userMessageObject.senderId[0]?.username === user.username
                      ? `justify-end`
                      : `justify-start `
                  }`}
                >
                  {userMessageObject.senderId[0]?.username != user.username && (
                    <div className=" flex items-center justify-center  mr-4">
                      <Avatar className='h-8 w-8 ml-2' >
      <AvatarImage className   src={`${BACKEND_URL}/users/${foundUserId}/images`} alt="@shadcn" />
      <AvatarFallback>{foundUserusername.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  
                    
                    </div>
                  )}
                  <div
                    className={`chat-right-panel-text-bubbles ${
                      userMessageObject.senderId[0]?.username === user.username
                        ? `bg-blue-400`
                        : `bg-gray-400 `
                    }`}
                  >
                    <div className="chat-right-panel-text-bubbles-innerdiv ">
                     
                    </div>
                    <li>{` ${userMessageObject.message}`}</li>
                  </div>
                  {userMessageObject.senderId[0]?.username ===
                    user.username && (
                    <div className="h-1/2">
  {/* <Avatar className='h-8 w-8 ml-2' >
      <AvatarImage className   src={`${BACKEND_URL}/users/${user._id}/images`} alt="@shadcn" />
      <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar> */}

                     
                    </div>
                  )}
                </div>
              ))}
            </ul>

            <ul className="database-ul">
              {databaseMessageLog?.map((dbMessageObject, index) => (
                <div
                  key={dbMessageObject._id}
                  className={`chat-right-panel-text-containers  flex items-center ${
                    dbMessageObject.senderId[0] === user._id
                      ? `justify-end`
                      : `justify-start`
                  }`}
                >
                  {dbMessageObject.senderId[0] != user._id && (
                    <div className=" mr-4">
                      <Avatar className='h-8 w-8 ml-2' >
      <AvatarImage className   src={`${BACKEND_URL}/users/${foundUserId}/images`} alt="@shadcn" />
      <AvatarFallback>{foundUserusername.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
                      
                    </div>
                  )}

                  <div
                    className={`chat-right-panel-text-bubbles ${
                      dbMessageObject.senderId[0] === user._id
                        ? `bg-blue-400`
                        : `bg-gray-400 `
                    }`}
                  >
                    <div
                      key={index + 1}
                      className="chat-right-panel-text-bubbles-innerdiv "
                    >
                     
                    </div>

                    <li key={index}>{` ${dbMessageObject.message}`}</li>
                  </div>
                  {dbMessageObject.senderId[0] === user._id && (
                    <div className="h-1/2">
                      {/* <Avatar className='h-8 w-8 ml-2' >
      <AvatarImage className   src={`${BACKEND_URL}/users/${user._id}/images`} alt="@shadcn" />
      <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar> */}
                     
                    </div>
                  )}
                </div>
              ))}
            </ul>
          </>
        }
      </div>
      <form className="input-box-container" onSubmit={handleButtonSubmit}>
        <label htmlFor="message"></label>

        <input
          className=" input w-5/6  h-full border-2 rounded-xl border-black/10 pl-2 text-slate-700 bg-gray-100 transform transition-transform duration-300  hover:bg-gray-200 pointer-events-auto"
          id="message"
          name="message"
          type="text"
          placeholder="Aa"
          value={textInputData.message}
          onChange={handleTextInput}
          required
          onClick={() => onClose()}
          ref={inputRef}
        ></input>

        <button  className="w-10 ml-1 rounded-xl border-blue-300 border-2 transform transition-transform duration-300 hover:scale-110 hover:bg-blue-100 pointer-events-auto">
          <i className="bx bxs-send"></i>
        </button>
      </form>
    </>
  );
}

export default ChatBox;
