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

  useEffect(() => {
    async function getUser(foundUserId) {
      const foundUserObject = await chatService.getUser(foundUserId);
      setSelectedUser(foundUserObject);
    }

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

    if (inputRef.current) {
      inputRef.current.focus(); 
      inputRef.current.select(); 
    }



    if (foundUserId && foundUserId != 'undefined') {
      getUser(foundUserId);
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

  useEffect(() => {
    const createChatRouter = async function () {
      setChatParticipant(selectedUser.user);
    };
    createChatRouter();
  }, [user, selectedUser]);

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
console.log(databaseMessageLog)
  return (
    <>
      <header className="top-chat-name-container">
        {!openSearchBox ? (
          <h1 className="top-chat-name">{selectedUser.user?.username}</h1>
        ) : (
          <SearchUser
            user={user}
            onClose={onClose}
            refreshUserChats={refreshUserChats}
          />
        )}
      </header>
      <div className="chat-window-right-panel-chat-container-overflow">
        {(foundUserId && databaseMessageLog?.length > 0 && messageLog?.length >0) ?  (
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
                    <div className="h-1/2">
                      <img
                        className="h-full"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA65JREFUaEPtml1y2jAQgG1fpOQkhSOAh+eWkzQ9SdJnRnCEkJPUuYgUr0dmVI9WuyutTVLiJxiMpE/7v1Jd3dlT3xlv9QX8v0v8S8LaEj4ej+umab5XVbWq63rlnFvB56qqOpirruvOOTd8rqrqtW3bZ+01hOOpS/h8Pq+stT881M+MxQP8ZS54NeAA9DEDEvsLwD+3bftba0wVYGPMr35BmqBTPjXwImAv1RevvlpCSI3TNU2z2W63o82L58wG9s4IYJd+iqSdBbyACnM28THHtsXAp9PpxTm35qxogXfE0CLgDyLZ6T6KoNnAN7RZjqIcuAkLC/iDw8KGdNbaw36/h4Ql+bCAjTF/Fww91JrRJKVt2wfqzySwMQbSwydqIObvY/yEfHnMrTUdIKnaHGAN6SZjp6Iz7CgpJ4E1FlLX9WW3220oDYCszTn3pBDyIPc+YPNRwI5aKPV70zQP3FTQp6qgUSVPUsoosJLtkjY1JdOY11q7wTx2ChgcVU49e2XoUz/SR8RE2ZtSkWalzCgFPNuklL4qpK+oWkeBNdTKF+6o80hBazhLTK0xYI2CXpTjhhtgjCk2p3686PwYcPGE3HCE2LBG7I+Gpyiwgg0N+S2VBGBqXeq0YFxswzEJa+wwzHuTsOQ3MrrhGHCRhw4kJ+pBKSUe4/Q3AR5Um9N4U0wtk3nAnDYcmuhSxcM/c8Z8yFLAVzXzH6BQ73rHslYoFqK+T+q0isMSlU0t8Ds/LGlkOgsAUVPwE49P0MOiYNGQGLVh7fDgj0THBttbZLVwnArJAjQBVFo+WKWGVkuF2dbglfvi/w+3+B83QekUEu16oMC5al2SQ4eS9+BQxOTU5GiGhwJnqnV2hZTIq8WVW6rxQPW0JJOpw46bIIwayXUkgbnnv1pqrNEUoNpKZM+J2f1g5cucWBJ7R5Bnk9UZCSyYbBZorpZx628SGHZc4MCKTuen0pXYbqo1G47LAoY/MFX7WiRwT/MwFbbWsu+OcGGH5EZiV5Id9+MOEu8X9EodZQYJB8RduLjGfUTRQQTsJS0JVeGioRwMb93BZhSdIOZEBzFwITRXapz3RJIdB8wCzrBpDgD7HYnNTgfNBg68N9u5sInwF9lXG7AhioADaLhMKnU2En61cFcMPK5aqayLbUKWrc4m4enAHhyKeCjqc0q70Ztfcm7aUWqjJuFEAgHw38YQBO/5rsb0gjh8f+Pet6LAFpNw7kKW+t+sEl4KQjLPF7Bktz7ju3cn4XclpDdbwJ4bKQAAAABJRU5ErkJggg=="
                      />
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
                      {/* {`${
                      userMessageObject.senderId[0]?.username
                        ? userMessageObject.senderId[0]?.username
                        : user.username
                    }`}{" "}
                    <button
                      onClick={function () {
                        handleDeleteButtonSubmit(userMessageObject, index);
                      }}
                    >
                      <i className="bx bx-trash-alt"></i>
                    </button> */}
                    </div>
                    <li>{` ${userMessageObject.message}`}</li>
                  </div>
                  {userMessageObject.senderId[0]?.username ===
                    user.username && (
                    <div className="h-1/2">
                      <img
                        className="h-full"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA65JREFUaEPtml1y2jAQgG1fpOQkhSOAh+eWkzQ9SdJnRnCEkJPUuYgUr0dmVI9WuyutTVLiJxiMpE/7v1Jd3dlT3xlv9QX8v0v8S8LaEj4ej+umab5XVbWq63rlnFvB56qqOpirruvOOTd8rqrqtW3bZ+01hOOpS/h8Pq+stT881M+MxQP8ZS54NeAA9DEDEvsLwD+3bftba0wVYGPMr35BmqBTPjXwImAv1RevvlpCSI3TNU2z2W63o82L58wG9s4IYJd+iqSdBbyACnM28THHtsXAp9PpxTm35qxogXfE0CLgDyLZ6T6KoNnAN7RZjqIcuAkLC/iDw8KGdNbaw36/h4Ql+bCAjTF/Fww91JrRJKVt2wfqzySwMQbSwydqIObvY/yEfHnMrTUdIKnaHGAN6SZjp6Iz7CgpJ4E1FlLX9WW3220oDYCszTn3pBDyIPc+YPNRwI5aKPV70zQP3FTQp6qgUSVPUsoosJLtkjY1JdOY11q7wTx2ChgcVU49e2XoUz/SR8RE2ZtSkWalzCgFPNuklL4qpK+oWkeBNdTKF+6o80hBazhLTK0xYI2CXpTjhhtgjCk2p3686PwYcPGE3HCE2LBG7I+Gpyiwgg0N+S2VBGBqXeq0YFxswzEJa+wwzHuTsOQ3MrrhGHCRhw4kJ+pBKSUe4/Q3AR5Um9N4U0wtk3nAnDYcmuhSxcM/c8Z8yFLAVzXzH6BQ73rHslYoFqK+T+q0isMSlU0t8Ds/LGlkOgsAUVPwE49P0MOiYNGQGLVh7fDgj0THBttbZLVwnArJAjQBVFo+WKWGVkuF2dbglfvi/w+3+B83QekUEu16oMC5al2SQ4eS9+BQxOTU5GiGhwJnqnV2hZTIq8WVW6rxQPW0JJOpw46bIIwayXUkgbnnv1pqrNEUoNpKZM+J2f1g5cucWBJ7R5Bnk9UZCSyYbBZorpZx628SGHZc4MCKTuen0pXYbqo1G47LAoY/MFX7WiRwT/MwFbbWsu+OcGGH5EZiV5Id9+MOEu8X9EodZQYJB8RduLjGfUTRQQTsJS0JVeGioRwMb93BZhSdIOZEBzFwITRXapz3RJIdB8wCzrBpDgD7HYnNTgfNBg68N9u5sInwF9lXG7AhioADaLhMKnU2En61cFcMPK5aqayLbUKWrc4m4enAHhyKeCjqc0q70Ztfcm7aUWqjJuFEAgHw38YQBO/5rsb0gjh8f+Pet6LAFpNw7kKW+t+sEl4KQjLPF7Bktz7ju3cn4XclpDdbwJ4bKQAAAABJRU5ErkJggg=="
                      />
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
                    <div className="h-1/2">
                      <img
                        className="h-full"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA65JREFUaEPtml1y2jAQgG1fpOQkhSOAh+eWkzQ9SdJnRnCEkJPUuYgUr0dmVI9WuyutTVLiJxiMpE/7v1Jd3dlT3xlv9QX8v0v8S8LaEj4ej+umab5XVbWq63rlnFvB56qqOpirruvOOTd8rqrqtW3bZ+01hOOpS/h8Pq+stT881M+MxQP8ZS54NeAA9DEDEvsLwD+3bftba0wVYGPMr35BmqBTPjXwImAv1RevvlpCSI3TNU2z2W63o82L58wG9s4IYJd+iqSdBbyACnM28THHtsXAp9PpxTm35qxogXfE0CLgDyLZ6T6KoNnAN7RZjqIcuAkLC/iDw8KGdNbaw36/h4Ql+bCAjTF/Fww91JrRJKVt2wfqzySwMQbSwydqIObvY/yEfHnMrTUdIKnaHGAN6SZjp6Iz7CgpJ4E1FlLX9WW3220oDYCszTn3pBDyIPc+YPNRwI5aKPV70zQP3FTQp6qgUSVPUsoosJLtkjY1JdOY11q7wTx2ChgcVU49e2XoUz/SR8RE2ZtSkWalzCgFPNuklL4qpK+oWkeBNdTKF+6o80hBazhLTK0xYI2CXpTjhhtgjCk2p3686PwYcPGE3HCE2LBG7I+Gpyiwgg0N+S2VBGBqXeq0YFxswzEJa+wwzHuTsOQ3MrrhGHCRhw4kJ+pBKSUe4/Q3AR5Um9N4U0wtk3nAnDYcmuhSxcM/c8Z8yFLAVzXzH6BQ73rHslYoFqK+T+q0isMSlU0t8Ds/LGlkOgsAUVPwE49P0MOiYNGQGLVh7fDgj0THBttbZLVwnArJAjQBVFo+WKWGVkuF2dbglfvi/w+3+B83QekUEu16oMC5al2SQ4eS9+BQxOTU5GiGhwJnqnV2hZTIq8WVW6rxQPW0JJOpw46bIIwayXUkgbnnv1pqrNEUoNpKZM+J2f1g5cucWBJ7R5Bnk9UZCSyYbBZorpZx628SGHZc4MCKTuen0pXYbqo1G47LAoY/MFX7WiRwT/MwFbbWsu+OcGGH5EZiV5Id9+MOEu8X9EodZQYJB8RduLjGfUTRQQTsJS0JVeGioRwMb93BZhSdIOZEBzFwITRXapz3RJIdB8wCzrBpDgD7HYnNTgfNBg68N9u5sInwF9lXG7AhioADaLhMKnU2En61cFcMPK5aqayLbUKWrc4m4enAHhyKeCjqc0q70Ztfcm7aUWqjJuFEAgHw38YQBO/5rsb0gjh8f+Pet6LAFpNw7kKW+t+sEl4KQjLPF7Bktz7ju3cn4XclpDdbwJ4bKQAAAABJRU5ErkJggg=="
                      />
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
                      {/* {`${
                      dbMessageObject.senderId[0] === user._id
                        ? user.username
                        : foundUserusername
                    }`}
                    <button
                      onClick={function () {
                        handleDeleteButtonSubmit(dbMessageObject, index);
                      }}
                    >
                      <i className="bx bx-trash-alt"></i>
                    </button> */}
                    </div>

                    <li key={index}>{` ${dbMessageObject.message}`}</li>
                  </div>
                  {dbMessageObject.senderId[0] === user._id && (
                    <div className="h-1/2">
                      <img
                        className="h-full"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA65JREFUaEPtml1y2jAQgG1fpOQkhSOAh+eWkzQ9SdJnRnCEkJPUuYgUr0dmVI9WuyutTVLiJxiMpE/7v1Jd3dlT3xlv9QX8v0v8S8LaEj4ej+umab5XVbWq63rlnFvB56qqOpirruvOOTd8rqrqtW3bZ+01hOOpS/h8Pq+stT881M+MxQP8ZS54NeAA9DEDEvsLwD+3bftba0wVYGPMr35BmqBTPjXwImAv1RevvlpCSI3TNU2z2W63o82L58wG9s4IYJd+iqSdBbyACnM28THHtsXAp9PpxTm35qxogXfE0CLgDyLZ6T6KoNnAN7RZjqIcuAkLC/iDw8KGdNbaw36/h4Ql+bCAjTF/Fww91JrRJKVt2wfqzySwMQbSwydqIObvY/yEfHnMrTUdIKnaHGAN6SZjp6Iz7CgpJ4E1FlLX9WW3220oDYCszTn3pBDyIPc+YPNRwI5aKPV70zQP3FTQp6qgUSVPUsoosJLtkjY1JdOY11q7wTx2ChgcVU49e2XoUz/SR8RE2ZtSkWalzCgFPNuklL4qpK+oWkeBNdTKF+6o80hBazhLTK0xYI2CXpTjhhtgjCk2p3686PwYcPGE3HCE2LBG7I+Gpyiwgg0N+S2VBGBqXeq0YFxswzEJa+wwzHuTsOQ3MrrhGHCRhw4kJ+pBKSUe4/Q3AR5Um9N4U0wtk3nAnDYcmuhSxcM/c8Z8yFLAVzXzH6BQ73rHslYoFqK+T+q0isMSlU0t8Ds/LGlkOgsAUVPwE49P0MOiYNGQGLVh7fDgj0THBttbZLVwnArJAjQBVFo+WKWGVkuF2dbglfvi/w+3+B83QekUEu16oMC5al2SQ4eS9+BQxOTU5GiGhwJnqnV2hZTIq8WVW6rxQPW0JJOpw46bIIwayXUkgbnnv1pqrNEUoNpKZM+J2f1g5cucWBJ7R5Bnk9UZCSyYbBZorpZx628SGHZc4MCKTuen0pXYbqo1G47LAoY/MFX7WiRwT/MwFbbWsu+OcGGH5EZiV5Id9+MOEu8X9EodZQYJB8RduLjGfUTRQQTsJS0JVeGioRwMb93BZhSdIOZEBzFwITRXapz3RJIdB8wCzrBpDgD7HYnNTgfNBg68N9u5sInwF9lXG7AhioADaLhMKnU2En61cFcMPK5aqayLbUKWrc4m4enAHhyKeCjqc0q70Ztfcm7aUWqjJuFEAgHw38YQBO/5rsb0gjh8f+Pet6LAFpNw7kKW+t+sEl4KQjLPF7Bktz7ju3cn4XclpDdbwJ4bKQAAAABJRU5ErkJggg=="
                      />
                    </div>
                  )}
                </div>
              ))}
            </ul>
          </>
        ) : (<div className="w-full h-full">yo
        
        
        
        
        
        
        
        </div>


        )}
      </div>
      <form className="input-box-container" onSubmit={handleButtonSubmit}>
        <label htmlFor="message"></label>

        <input
          className=" input w-5/6 h-full border-2 rounded-lg border-black/10 pl-2 text-slate-700 bg-gray-100"
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

        <button className="w-10 ml-1 rounded-lg border-blue-300 border-2">
          <i className="bx bxs-send"></i>
        </button>
      </form>
    </>
  );
}

export default ChatBox;
