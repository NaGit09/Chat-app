import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstanace } from "../lib/axios.js";
import React from "react";
import { EarOff, Users } from "lucide-react";
import {useAuthStore} from "./useAuthStore";
// useChatStore is a Zustand store that 
// manages chat-related state and actions for a chat application.
// It handles fetching users, messages, sending messages, and managing socket connections for real-time updates.
export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],  
  SelectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUser: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstanace.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstanace.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { SelectedUser, messages } = get();
    try {
      const res = await axiosInstanace.post(
        `/messages/send/${SelectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  subscribeToMessages: () => {
    const { SelectedUser } = get();
    if (!SelectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      const isMessageSendFromSelectedUser = newMessage.senderId === SelectedUser._id
     if(!isMessageSendFromSelectedUser) return ;
      set({ messages: [...get().messages, newMessage] });
    });

  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  }
  ,setSelectedUser: async (SelectedUser) => {
    set({ SelectedUser: SelectedUser });
  },
}));
