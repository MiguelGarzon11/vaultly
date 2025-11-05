import React from "react";

interface NotificationProps {
  title: string;
  message: string;
  type: string;
}


export function Notification({title, message, type}: NotificationProps) {

  let icon: string | null = null;

  switch (type) {
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

  return (

        <div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-auto h-auto px-5 py-3 rounded-2xl animate-slide-in-top
          ${
            type === "success"
              ? "bg-gradient-to-r from-primary to-secondary"
              : type === "info"
              ? "bg-primary"
              : type === "warning"
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
              {title}
            </h1>
            <p className="text-sm sm:text-[18px] col-span-1 text-white font-extralight">
              {message}
            </p>
          </div>
        </div>
  );
}
