import React, { useState } from "react";
import type { ReactNode } from "react";
import SideBar from "./Sidebar.tsx";
import Dasheader from "./Dasheader.tsx";
import { SideBarService } from "../services/sidebarService.ts";

const sidebarService = new SideBarService();

type Props = {
  children: ReactNode;
};

export default function SidebarWrapper({ children }: Props) {
  const [isOpen, setIsopen] = useState(sidebarService.isOpen);

  const toggleSidebar = () => {
    sidebarService.toggle();
    setIsopen(sidebarService.isOpen);
  };

  return (
    <>
      <SideBar isOpen={isOpen} />
      <div className="flex flex-col h-full bg-dark-back/50 overflow-y-auto rounded-2xl w-full caret-transparent transition-all duration-300">
        {/* <Dasheader isOpen={isOpen} toggleSidebar={toggleSidebar} /> */}
        <hr />
        <div className="p-4 sm:p-10">{children}</div>
      </div>
    </>
  );
}
