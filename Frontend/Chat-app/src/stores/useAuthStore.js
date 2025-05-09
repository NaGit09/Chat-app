import { create } from "zustand";
import { axiosInstanace } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
// useAuthStore is a Zustand store 
// that manages authentication state and 
// socket connection for a chat application.
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isUpdateProfile: false,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstanace.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Erro in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  login: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstanace.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in   successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstanace.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created  successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstanace.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstanace.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL , {
      query :  {
          userId : authUser._id,
      }
    });

    socket.connect();
    set({socket : socket})
    socket.on("getOnlineUsers" , (userIds) => {
      set({onlineUsers :  userIds})
    })
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  }, 
}));
