import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

interface Notification {
  title: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextProps {
  notify: (title: string, message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextProps | null>(
  null
);

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error(
      "useNotifications debe ser usado dentro de un NotificationProvider"
    );
  }
  return ctx;
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);

  const notify = (title: string, message: string, type: NotificationType) => {
    setNotification({ title, message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  let icon: string | null = null;

  if (notification) {
    switch (notification.type) {
      case "success":
        icon = "success";
        break;
      case "info":
        icon = "info";
        break;
      case "warning":
        icon = "warning";
        break;
      case "error":
        icon = "error";
        break;
    }
  }

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      {notification && (
        <div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-auto h-auto px-5 py-3 rounded-2xl animate-slide-in-top
          ${
            notification.type === "success"
              ? "bg-gradient-to-r from-primary to-secondary"
              : notification.type === "info"
              ? "bg-primary"
              : notification.type === "warning"
              ? "bg-yellow-500"
              : "bg-red-400"
          }`}
        >
          <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-6 rounded-3xl items-center w-full">
            <img
              src={`/assets/icons/${icon}.svg`}
              className="col-span-1 row-span-2 w-10 h-10 sm:w-12 sm:h-12"
              alt="Icono notificación"
            />
            <h1 className="text-xl col-span-1 text-white font-medium">
              {notification.title}
            </h1>
            <p className="text-sm sm:text-[18px] col-span-1 text-white font-extralight">
              {notification.message}
            </p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
