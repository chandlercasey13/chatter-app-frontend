import React from "react";
import { Link } from "react-router-dom";
import ChatBarChats from "./ChatBarChats";
import useChatLogs from "../../zustand/useChatLogs";

const ChatLog = (props) => {
  const { chats } = ChatBarChats();
  console.log("Chats:", chats);
  return (
    <div className="py-2 flex-col overlfow-auto">
      {chats.map((chat) => (
        <ChatBarChats key={chat._id} chat={chat} />
      ))}
      {/* <ChatBarChats />
      <ChatBarChats />
      <ChatBarChats />
      <ChatBarChats />
      <ChatBarChats />
      <ChatBarChats />
      <ChatBarChats />
      <ChatBarChats /> */}
    </div>
  );
};

export default ChatLog;
