import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export function useNotification() {
    const ctx = useContext(NotificationContext);
    if(!ctx) throw new Error("useNotification debe usarse dentro de un NotificationProvider");
    return ctx
}