import ChatBarChat from "./ChatBarChat";
import ChatLog from "./ChatLog";
import SearchBar from "./SearchBar";

const ChatBar = (props) => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchBar />
      <div className="divider px-4"></div>
      <ChatLog />
      <div className="divider px-3"></div>
      {/* <ChatLog />
      <SignOutButton /> */}
    </div>
  );
};

export default ChatBar;
