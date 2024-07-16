import React from "react";
import { Link } from "react-router-dom";
import ChatBarChat from "./ChatBarChat";
import useChatLogs from "../../zustand/useChatLogs";

const ChatLog = (props) => {
  const { chats } = ChatBarChat();
  console.log("Chats:", chats);
  return (
    <div className="py-2 flex-col overlfow-auto">
      {chats?.map((chat, index) => (
        <ChatBarChat
          key={chat._id}
          chat={chat}
          lastIndex={index === chats.length - 1}
        />
      ))}
    </div>
  );
};

export default ChatLog;
