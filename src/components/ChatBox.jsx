import React, { useEffect, useState, useRef } from "react";
import { socket } from "../socket";
import * as chatService from "../../services/chatService";
import useChats from "../zustand/useChatLogs";

function ChatBox({ user }) {
  const [textInputData, setTextInputData] = useState({
    senderId: [ {username : user.username}],
    message: "",
  });

  const { selectedChats, setSelectedChats } = useChats();
  const [messageLog, setMessageLog] = useState([]);

  useEffect(() => {
    const fetchAllMessages = async function () {
      try {
        const messageData = await chatService.messageIndex();

        setMessageLog(messageData.reverse());
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllMessages();
  }, []);





  function handleTextInput(event) {
    setTextInputData({
      ...textInputData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleButtonSubmit(e) {
    e.preventDefault();

    const messageData = await chatService.messageIndex();

   
    setMessageLog([textInputData, ...messageData.reverse()]);

    socket.emit("message", {
      senderId: [ {username : user.username}],
      message: textInputData.message,
      
    });

    
    chatService.create(textInputData);
    setTextInputData({ senderId: [ {username : user.username}], message: "" });
  }

  async function handleDeleteButtonSubmit(usermessageObject, index) {
    await chatService.deleteMessage(usermessageObject._id);

    setMessageLog(
      messageLog.filter((message) => {
        console.log(message[index]);
      })
    );

    //set the message log to trigger useeffect and rerender messages to page
  }

  socket.on("message", (messagecontent) => {
    setMessageLog([messagecontent, ...messageLog ]);
    
  });

  return (
    <>
      <ul className="list-none flex flex-col-reverse items-center overflow-auto">
        {messageLog.map((userMessageObject, index) => (
          <div
            className={`w-5/6 flex ${
              userMessageObject.senderId[0]?.username === user.username 
                ? `justify-end`
                : `justify-start`
            }`}
          >
            <div className="border-2 border-black rounded-xl pl-2 pr-2 pb-2 m-1 ">
              <div key={index + 1} className="font-semibold pt-1 ">
                {`${
                  userMessageObject.senderId[0]?.username
                   
                }`}{" "}
                <button
                  onClick={function () {
                    handleDeleteButtonSubmit(userMessageObject, index);
                  }}
                >
                  <i className="bx bx-trash-alt"></i>
                </button>
              </div>
              <li key={index}>{` ${userMessageObject.message}`}</li>
            </div>
          </div>
        ))}
      </ul>

      <form
        className="w-full h-10 flex justify-center mb-2"
        onSubmit={handleButtonSubmit}
      >
        <label htmlFor="message"></label>

        <input
          className="w-5/6 h-full border-2 rounded-lg border-black/30 pl-2"
          id="message"
          name="message"
          type="text"
          value={textInputData.message}
          onChange={handleTextInput}
          required
        ></input>

        <button className="w-10 rounded-lg border-black border-2">
          <i className="bx bxs-send"></i>
        </button>
      </form>
    </>
  );
}

export default ChatBox;
