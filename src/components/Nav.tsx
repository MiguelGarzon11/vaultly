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
      dist: "translate-x-0",
    },
    {
      href: "/dashboard/transacciones",
      iconActive: "/assets/icons/transac.svg",
      iconInactive: "/assets/icons/transacblue.svg",
      label: "Transacciones",
      dist: "translate-x-16",
    },
    {
      href: "/dashboard/categorias",
      iconActive: "/assets/icons/categ.svg",
      iconInactive: "/assets/icons/categblue.svg",
      label: "Categorías",
      dist: "translate-x-32",
    },
    {
      href: "/dashboard/graficas",
      iconActive: "/assets/icons/graf.svg",
      iconInactive: "/assets/icons/grafblue.svg",
      label: "Gráficas",
      dist: "translate-x-48",
    },
    {
      href: "/dashboard/presupuesto",
      iconActive: "/assets/icons/presup.svg",
      iconInactive: "/assets/icons/presupblue.svg",
      label: "Presupuesto",
      dist: "translate-x-64",
    },
  ];

  const [activePath, setActivePath] = useState(0);

  return (
    <div className="sm:hidden fixed top-0 left-0 bg-white rounded-b-xl w-full">
      <ul className="flex relative justify-center items-end">
        <span
          className={`bg-secondary h-12 w-12 border-4 border-dark-back absolute rounded-full -bottom-5`}
        ></span>

        {navItems.map((menu, i) => (
          <li key={i} className="w-16">
            <a
              onClick={() => {
                setActivePath(i);
              }}
              className="flex flex-col items-center justify-end text-center pb-5 gap-5"
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
                  href={activePath === i ? menu.iconActive : menu.iconInactive}
                />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
