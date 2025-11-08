import { isAstroComponentFactory } from "astro/runtime/server/render/astro/factory.js";
import React, { useEffect, useState } from "react";

export default function Nav() {
  const [activePath, setActivePath] = useState("");

  const [isOpen, setIsopen] = useState(false);

  function toggleIsopen() {
    setIsopen(!isOpen);
  }

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  const navItems = [
    {
      href: "/dashboard",
      iconActive: "/assets/icons/dash.svg",
      iconInactive: "/assets/icons/dashblue.svg",
      label: "Dashboard",
    },
    {
      href: "/dashboard/transacciones",
      iconActive: "/assets/icons/transac.svg",
      iconInactive: "/assets/icons/transacblue.svg",
      label: "Transacciones",
    },
    {
      href: "/dashboard/categorias",
      iconActive: "/assets/icons/categ.svg",
      iconInactive: "/assets/icons/categblue.svg",
      label: "Categorías",
    },
    {
      href: "/dashboard/graficas",
      iconActive: "/assets/icons/graf.svg",
      iconInactive: "/assets/icons/grafblue.svg",
      label: "Gráficas",
    },
    {
      href: "/dashboard/presupuesto",
      iconActive: "/assets/icons/presup.svg",
      iconInactive: "/assets/icons/presupblue.svg",
      label: "Presupuesto",
    },
  ];

  return (
    <>
      <div className="sm:hidden bg-white w-full fixed top-0 py-3 left-0 h-[95px] rounded-b-3xl flex flex-col items-center gap-4">
        <div className="flex flex-row justify-center items-center gap-2">
          <img src="/assets/icons/icon.svg" alt="logo" className="w-6 h-6" />
          <h1 className="text-text font-bold text-xl">Vaultly</h1>
        </div>
        <nav className="flex flex-row w-[90%] justify-around items-center">
          {navItems.map(({ href, iconActive, iconInactive, label }) => {
            const isActive = activePath === href;

            return (
              <div
                className="flex flex-col justify-center items-center
                 w-full"
                key={href}
              >
                <span
                  className={`transition-all duration-500 text-secondary-text font-medium text-[10px] ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {label}
                </span>
                <a
                  href={href}
                  className={`flex flex-col justify-center items-center w-10 h-10 transition-all duration-200 active:bg-dark-back active:rounded-full ${
                    isActive
                      ? "translate-y-1.5 bg-secondary rounded-full border-4 border-dark-back "
                      : "-translate-y-5"
                  }`}
                >
                  <img
                    src={isActive ? iconActive : iconInactive}
                    alt={label}
                    className={`w-5 h-5 transition-transform ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                  />
                </a>
              </div>
            );
          })}
          <div className="flex flex-col items-center justify-center w-full -translate-y-3.5 h-8">
            <button
              className="w-[70%] flex justify-center items-center active:bg-dark-back h-10 active:rounded-full"
              onClick={toggleIsopen}
            >
              <img
                src={
                  activePath === "/dashboard/configuracion"
                    ? "/assets/icons/configblue.svg"
                    : "/assets/icons/moreblue.svg"
                }
                className="w-5 h-5"
              ></img>
            </button>
          </div>
          {isOpen && (
            <div className="fixed top-24 right-5 bg-white shadow-xl rounded-xl ring-1 ring-secondary-text/50 p-4 z-50 flex flex-col items-start justify-start text-sm font-extralight gap-2 w-auto">
              <a
                href="/dashboard/configuracion"
                className="flex items-center gap-2 p-1"
              >
                <img
                  src="/assets/icons/configblue.svg"
                  className="w-4 h-4"
                  alt="Icono configuración"
                />
                Configuración
              </a>
              <button className="flex justify-start items-center gap-2 active:text-red-500 active:ring-1 active:ring-red-500 rounded-xl active:bg-red-50 p-1">
                <img
                  src="/assets/icons/logout.svg"
                  className="w-4 h-4"
                  alt="Icono cerrar sesión"
                />
                Cerrar sesión
              </button>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
