import React, { createContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { Notification } from "../components/noti";

export type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationData {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
}

interface NotificationContextProps {
    notify: (n: Omit<NotificationData, "id">) => void;
}

export const NotificationContext = createContext<NotificationContextProps | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    const notify = useCallback((n: Omit<NotificationData, "id">) => {
        const id = crypto.randomUUID();
        setNotifications((prev) => [...prev, { ...n, id }]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        }, 3000);
    }, []);

    return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 flex flex-col gap-3 z-50">
        {notifications.map((n) => (
          <Notification key={n.id} title={n.title} message={n.message} type={n.type} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}