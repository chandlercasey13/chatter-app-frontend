import React from "react";
import { Link } from "react-router-dom";
import Chat from "./Chat";
import useChatLogs from "../../zustand/useChatLogs";

const ChatLog = (props) => {
  const { chats } = Chat();

  return (
    <div className="py-4 flex-col overlfow-auto">
      {chats?.map((chat, index) => (
        <Chat
          key={chat._id}
          chat={chat}
          lastIndex={index === chats.length - 1}
        />
      ))}
    </div>
  );
};

export default ChatLog;
