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
    console.log(textInputData)
  }

  function handleButtonSubmit(e) {
    e.preventDefault();

    socket.emit("message", textInputData.message);
    setMessageLog([...messageLog, textInputData.message]);
    chatService.create(textInputData);
    setTextInputData({ senderId: user.username, message: "" });
  }

  socket.on("message", (messagecontent) => {
    setMessageLog([...messageLog, messagecontent]);
  });

  return (
    <>
      <ul className="list-none flex flex-col justify-center items-center">
        {messageLog.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>

      <form
        className="w-full flex justify-center"
        onSubmit={handleButtonSubmit}
      >
        <label htmlFor="textInput"></label>

        <input
          className="w-5/6 border-2 rounded-lg border-black/30"
          id="message"
          name="message"
          type="text"
          value={textInputData.message}
          onChange={handleTextInput}
          required
        ></input>

        <button>
          {" "}
          <i className="bx bxs-send"></i>
        </button>
      </form>
    </>
  );
}

export default ChatBox;
