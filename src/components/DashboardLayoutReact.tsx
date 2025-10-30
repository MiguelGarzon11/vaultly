import React, { useState } from "react";
import SideBar from "./Sidebar";
import Dasheader from "./Dasheader";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggle ejecutado");
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <main className="h-full w-full flex flex-row bg-dark-back/60 items-start caret-transparent">
      <SideBar isOpen={isOpen} />
      <div className="flex flex-col w-full h-full">
        <Dasheader isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <hr />
        <div className="p-4 sm:p-12">{children}</div>
      </div>
    </main>
  );
}
