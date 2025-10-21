import React from "react";

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Dasheader({ isOpen, toggleSidebar }: Props) {
  return (
    <div className="flex flex-row justify-between items-center py-8 px-10 caret-transparent">
      <button
        onClick={toggleSidebar}
        className="h-10 w-10 flex items-center justify-center hover:bg-black/10 rounded-lg cursor-pointer"
      >
        <img src="assets/icons/panel.svg" alt="icono panel" id="dIcon" />
      </button>
      <div className="flex flex-row items-center justify-center gap-2">
        <img
          src="assets/icons/icon.svg"
          alt="icono usuario"
          className="h-8 w-8"
        />
        <h1 className="text-2xl font-extrabold text-secondary-text">Vaultly</h1>
      </div>
    </div>
  );
}
