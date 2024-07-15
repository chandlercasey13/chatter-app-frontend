import { useEffect, useState } from "react";
import * as chatService from "/services/chatService.js";

const ChatBarChats = (user) => {
  const useFetchChats = () => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
      const fetchAllChats = async () => {
        const chatsData = await chatService.index();
        setChats(chatsData);
      };
      if (user) fetchAllChats();
    }, [chats]);
  };

  return (
    <>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online here">
          <div className="w-10 rouned-full">
            <img src="img" alt="avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-100"></p>
            <span className="text-l">Chatter User</span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default ChatBarChats;
