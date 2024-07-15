import { create } from "zustand";

const useChats = create((set) => ({
  selectedChats: null,
  setSelectedChats: (selectedChats) => set({ selectedChats }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useChats;
