export type AlertType = "success" | "error" | "warning" | "info";

export interface Alert {
    type: AlertType;
    message: string;
    detail: string | null;
}

type AlertListener = (alert: Alert | null) => void;

const listeners: AlertListener[] = [];
let currentAlert: Alert | null = null;


export function showAlert(type: AlertType, message: string, detail: string | null) {
    currentAlert = {type, message, detail};
    listeners.forEach((fn) => fn(currentAlert)),

    setTimeout(() => {
        currentAlert = null,
        listeners.forEach((fn) => fn(currentAlert));
    }, 2000);
}

export function subscribeAlert(callback: AlertListener) {
    listeners.push(callback);
    callback(currentAlert);
    return () => {
        const idx = listeners.indexOf(callback);
        if (idx !== -1) listeners.splice(idx, 1);
    }
}