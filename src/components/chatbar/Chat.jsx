import { useEffect, useState } from "react";
import * as chatService from "/services/chatService.js";
import { VscSquirrel } from "react-icons/vsc";
import useChats from "../../zustand/useChatLogs";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const { selectedChats, setSelectedChats } = useChats();
  const isSelected = selectedChats?._id === chatService._id;

  // useEffect(() => {
  //   const fetchAllChats = async () => {
  //     try {
  //       const res = await fetch("/chatlogs/user");
  //       const data = await res.json();
  //       if (data.error) {
  //         throw new Error(data.error);
  //       }
  //       setChats(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchAllChats();
  // }, []);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer"
      ${isSelected ? "bg-sky-500" : ""} `}
        onClick={() => setSelectedChats(selectedChats)}
      >
        <div className="avatar online here">
          <div className="w-10 rouned-full">
            <img src="img" alt="avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-100">Chatter User</p>
            <span className="text-l">
              <VscSquirrel />
            </span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};
export default Chat;
