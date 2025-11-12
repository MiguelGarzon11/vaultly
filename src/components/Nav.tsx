import React, { useState } from "react";

export default function Nav() {
  const [isOpen, setIsopen] = useState(false);

  function toggleIsopen() {
    setIsopen(!isOpen);
  }

  const navItems = [
    {
      href: "/dashboard",
      iconActive: "/assets/icons/dash.svg",
      iconInactive: "/assets/icons/dashblue.svg",
      label: "Dashboard",
      dist: "-translate-x-32",
    },
    {
      href: "/dashboard/transacciones",
      iconActive: "/assets/icons/transac.svg",
      iconInactive: "/assets/icons/transacblue.svg",
      label: "Transacciones",
      dist: "-translate-x-16",
    },
    {
      href: "/dashboard/categorias",
      iconActive: "/assets/icons/categ.svg",
      iconInactive: "/assets/icons/categblue.svg",
      label: "Categorías",
      dist: "translate-x-0",
    },
    {
      href: "/dashboard/graficas",
      iconActive: "/assets/icons/graf.svg",
      iconInactive: "/assets/icons/grafblue.svg",
      label: "Gráficas",
      dist: "translate-x-16",
    },
    {
      href: "/dashboard/presupuesto",
      iconActive: "/assets/icons/presup.svg",
      iconInactive: "/assets/icons/presupblue.svg",
      label: "Presupuesto",
      dist: "translate-x-32",
    },
  ];

  const [activePath, setActivePath] = useState(0);

  return (
    <div className="sm:hidden fixed top-0 left-0 bg-white rounded-b-2xl w-full pt-3 drop-shadow-lg drop-shadow-dark-back z-50">
      <div className="flex flex-row justify-center items-center">
        <img
          src="/assets/icons/icon.svg"
          alt="Icono de Vaultly"
          className="w-8 h-8"
        />
      </div>
      <div className="flex flex-row w-full justify-center">
        <ul className="flex relative justify-center items-end">
          <span
            className={`absolute bg-secondary h-12 w-12 border-4 border-dark-back rounded-full -bottom-5 ${navItems[activePath].dist} duration-500`}
          >
            <span className="w-3.5 h-3.5 bg-transparent absolute top-[8.5px] -left-[17.5px] rounded-br-2xl shadow-1"></span>
            <span className="w-3.5 h-3.5 bg-transparent absolute top-[8.5px] -right-[17.5px] rounded-bl-2xl shadow-2"></span>
          </span>

          {navItems.map((menu, i) => (
            <li key={i} className="w-16">
              <a
                onClick={() => setActivePath(i)}
                className="flex flex-col items-center justify-end text-center pb-5 gap-3"
              >
                <span
                  className={`text-sm font-extralight
                  ${
                    activePath === i
                      ? "translate-y-5 opacity-100 duration-700"
                      : "mt-0 opacity-0 duration-300"
                  }`}
                >
                  {menu.label}
                </span>
                <svg
                  className={` w-6 h-6 ${
                    activePath === i
                      ? "translate-y-7 duration-700"
                      : "translate-y-0 duration-700"
                  }`}
                >
                  <use
                    href={
                      activePath === i ? menu.iconActive : menu.iconInactive
                    }
                  />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex justify-center items-center ml-2">
          <button
            onClick={toggleIsopen}
            className="flex w-8 h-8 active:bg-dark-back rounded-xl mt-2 justify-center items-center"
          >
            <img
              src={`${
                isOpen === true
                  ? "/assets/icons/moreblue.svg"
                  : "/assets/icons/more.svg"
              } `}
              alt="Icono menú"
              className="w-6 h-6 duration-700"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
}
