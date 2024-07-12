import ChatLog from "./ChatLog";

const ChatBar = (props) => {
  return (
    <div>
      <div className="divider px-3"></div>
      <ChatLog />
    </div>
  );
};

export default ChatBar;
