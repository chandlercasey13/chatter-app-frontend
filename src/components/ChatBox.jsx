import React, { useState } from "react";
import { socket } from "../socket";
import * as chatService from "../../services/chatService";

function ChatBox({ user }) {
  const [textInputData, setTextInputData] = useState({
    senderId: user.username,
    message: "",
  });

  const [messageLog, setMessageLog] = useState([]);

  function handleTextInput(event) {
    setTextInputData({
      ...textInputData,
      [event.target.name]: event.target.value,
    });
  }

  function handleButtonSubmit(e) {
    e.preventDefault();

    setMessageLog([...messageLog, textInputData]);

    socket.emit("message", {
      senderId: user.username,
      message: textInputData.message,
    });

    // chatService.create(textInputData);
    setTextInputData({ senderId: user.username, message: "" });
  }

  socket.on("message", (messagecontent) => {
    setMessageLog([...messageLog, messagecontent]);
  });

  console.log(messageLog);

  return (
    <>
      <ul className="list-none flex flex-col  items-center">
        {messageLog.map((userMessageObject, index) => (
          <div
            className={`w-5/6 flex ${
              userMessageObject.senderId === user.username
                ? `justify-end`
                : `justify-start`
            }`}
          >
            <div className="border-2 border-black rounded-xl p-2 m-1 ">
              <li
                key={index}
              >{`${userMessageObject.senderId} :  ${userMessageObject.message}`}</li>
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
