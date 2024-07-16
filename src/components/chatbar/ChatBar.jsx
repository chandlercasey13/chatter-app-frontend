import React, { useState } from "react";
import ChatBarChat from "./ChatBarChat";
import ChatLog from "./ChatLog";
import SearchBar from "./SearchBar";
import SearchUser from "./SearchUser";

const ChatBar = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  
  const onOpen = () => {setOpenSearchBox(true)};
  const onClose = () => {setOpenSearchBox(false)};

  return (
    <div className="rounded-lg border-purple-700 bg-purple-200 p-4 w-40 flex flex-col">
      <SearchBar onOpen={onOpen}/>
      {openSearchBox ? 
      <SearchUser /> : ""
      }
      <div className="divide-y-4 divde-slate-400/25"></div>
      <ChatLog />
      <div className="divide-y-4 divde-slate-400/25"></div>
      <div>
        {allUsers.length === 0 && (
          <div>
            <div className="text-slate-500">
              <p>Start new chat!</p>
            </div>
          </div>
        )}
      </div>
{
    openSearchBox && (
        <SearchUser onClose={onClose}/>
    )
}
    </div>
  );
};

export default ChatBar;
