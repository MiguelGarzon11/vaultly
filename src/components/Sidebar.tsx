import React from "react";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
}

export default function SideBar({ isOpen }: Props) {
  return (
    <main
      className={clsx(
        "hidden inset-0 h-[100%] bg-primary sm:flex flex-col caret-transparent transition-all duration-200",
        isOpen
          ? "w-[70%] sm:w-[40%] md:w-[35%] lg:w-[25%] rounded-r-4xl py-6 sm:py-10 px-6 sm:px-8"
          : "w-[10%] sm:w-[8%] md:w-[4%] lg:w-[5%] rounded-r-2xl sm:py-3 sm:p-1 md:py-5 lg:py-5 justify-center"
      )}
    >
      <div className="w-full h-auto flex flex-row sm:gap-5 md:gap-5 mb-4 items-center justify-center px-3">
        <img
          src="/assets/icons/iconwhite.svg"
          alt="Vaultly Logo"
          className={clsx(
            "transition-all duration-200",
            isOpen
              ? "h-10 w-10 sm:h-12 sm:w-12 md:w-14 md:h-14"
              : "h-10 w-10 md:h-12 md:w-12 lg:w-10 lg:h-10"
          )}
        />
        {isOpen && (
          <>
            <div className="flex flex-col w-full justify-around">
              <h1 className="text-white text-2xl md:text-xl lg:text-3xl font-extrabold text-balance">
                Vaultly
              </h1>
              <p className="text-dark-back font-light text-[12px] sm:text-sm text-balance">
                Finanzas Personales
              </p>
            </div>
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
