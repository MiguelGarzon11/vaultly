import React from "react";
import { NotificationProvider } from "../context/NotificationContext";

export default function AppProvider({children}: { children: React.ReactNode }) {
    return <NotificationProvider>{children}</NotificationProvider>
}