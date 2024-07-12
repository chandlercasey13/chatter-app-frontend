import { create } from "zustand";

const useChatLogs = create((set) => ({
  selectedChatLog: null,
  setSelectedChatLog: (selectedChatLog) => set({ selectedChatLog }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useChatLogs;
