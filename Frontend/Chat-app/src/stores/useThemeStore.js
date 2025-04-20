import { create } from "zustand";
// useThemeStore is a Zustand store that manages the theme state of the chat application.
// It allows users to switch between different themes and persists the selected theme in local storage.
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));