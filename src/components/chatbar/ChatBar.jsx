import React, { useState } from "react";
import ChatBarChat from "./ChatBarChat";
import ChatLog from "./ChatLog";
import SearchBar from "./SearchBar";

const ChatBar = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [searchUser, setSearchUser] = useState(false);

  return (
    <div className="rounded-lg border-purple-700 bg-purple-200 p-4 w-40 flex flex-col">
      <SearchBar />
      <div className="divide-y-4 divde-slate-400/25"></div>
      <ChatLog />
      <div className="divide-y-4 divde-slate-400/25"></div>
      <div>
        {
            allUsers.length === 0 && (
                <div>
                    <div className="text-slate-500">
                        <p>Start new chat!</p>
                    </div>
                </div>
            )
        }
      </div>
    </div>
  );
};

export default ChatBar;
