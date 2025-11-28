import React, { useState } from "react";
import SideBar from "../components/Sidebar";
import Dasheader from "../components/Dasheader";
import Nav from "../components/Nav";

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
    <main className="h-screen w-full flex flex-row bg-dark-back items-start caret-transparent px-3 py-5 sm:py-0 sm:px-0">
      <Nav></Nav>
      <SideBar isOpen={isOpen} />
      <div className="flex flex-col w-full h-full">
        <Dasheader isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <hr className="hidden sm:flex" />
        <div className="mt-28 p-4 sm:p-8 sm:mt-0 overflow-hidden">{children}</div>
      </div>
    </main>
  );
}
