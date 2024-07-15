import ChatLog from "./ChatLog";

const ChatBar = (props) => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
        <div>Search Bar Here</div>
      <div className="divider px-3"></div>
      <ChatLog />
    </div>
  );
};

export default ChatBar;
