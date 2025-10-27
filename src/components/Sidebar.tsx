import React from "react";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
}

export default function SideBar({ isOpen }: Props) {
  return (
    <main
      className={clsx(
        "inset-0 h-full bg-primary flex flex-col caret-transparent transition-all duration-200",
        isOpen
          ? "w-[70%] md:w-[24%] lg:w-[20%] rounded-r-4xl py-6 sm:py-10 px-6 sm:px-8"
          : "w-[10%] sm:w-[8%] lg:w-[5%] rounded-r-2xl sm:py-3 sm:p-1 md:py-3 lg:py-5 justify-center"
      )}
    >
      <div className={clsx("items-center justify-start gap-x-1 sm:gap-x-2 lg:gap-x-0 xl:gap-x-5",
        isOpen ? "grid grid-cols-2 mb-4 sm:mb-6 lg:mb-10" : "grid grid-cols-1 justify-center mb-4"
      )}>
        <img
          src="/assets/icons/iconwhite.svg"
          alt="Vaultly Logo"
          className={clsx(
            "transition-all duration-200",
            isOpen
              ? "row-span-2 h-10 w-10 sm:h-12 sm:w-12 md:w-16 md:h-16 lg:w-18 lg:h-18 justify-center"
              : "flex row-span-2 h-10 w-10 md:h-12 md:w-12 justify-center items-center"
          )}
        />
        {isOpen && (
          <>
            <h1 className="col-span-1 text-white text-2xl md:text-xl lg:text-5xl font-extrabold text-balance">
              Vaultly
            </h1>
            <p className="col-span-1 text-dark-back font-light text-[12px] sm:text-sm lg:text-xl text-balance">
              Finanzas Personales
            </p>
          </>
        )}
      </div>
      <hr className="text-white my-3" />
      {isOpen ? (
        <p className="m-3 text-dark-back font-medium text-xl">Navegación</p>
      ) : null}
      <div className="w-full h-full justify-between flex flex-col my-5 text-white font-normal text-lg">
        <nav
          className={clsx(
            "flex flex-col w-full h-auto gap-2",
            isOpen ? null : "justify-center items-center"
          )}
        >
          <a href="/dashboard" id="nav">
            <img src="/assets/icons/dash.svg" alt="icon home" id="dIcon" />
            {isOpen ? "Dashboard" : null}
          </a>
          <a href="/dashboard/transacciones" id="nav">
            <img
              src="/assets/icons/transac.svg"
              alt="icon transacciones"
              id="dIcon"
            />
            {isOpen ? "Transacciones" : null}
          </a>
          <a href="/dashboard/categorias" id="nav">
            <img
              src="/assets/icons/categ.svg"
              alt="icon categorias"
              id="dIcon"
            />
            {isOpen ? "Categorias" : null}
          </a>
          <a href="/dashboard/graficas" id="nav">
            <img src="/assets/icons/graf.svg" alt="icon grafica" id="dIcon" />
            {isOpen ? "Graficas" : null}
          </a>
          <a href="/dashboard/presupuesto" id="nav">
            <img
              src="/assets/icons/presup.svg"
              alt="icon presupuesto"
              id="dIcon"
            />
            {isOpen ? "Presupuesto" : null}
          </a>
        </nav>
        <div className="flex flex-col gap-2">
          <hr className="text-white my-3" />
          <a
            href="/dashboard/configuracion"
            className={
              (clsx("w-full"),
              isOpen ? undefined : "flex justify-center items-center")
            }
            id="nav"
          >
            <img
              src="/assets/icons/config.svg"
              alt="icon configuración"
              id="dIcon"
            />
            {isOpen ? "Configuración" : null}
          </a>
        </div>
      </div>
    </main>
  );
}
