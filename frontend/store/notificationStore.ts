import { create } from "zustand";

interface NotificationState {
  notifications: string[];
  addNotification: (notification: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
}));
