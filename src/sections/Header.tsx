import React, { useState } from "react"

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);

  function handlerNav() {
    setIsOpen(!isOpen)
    console.log("Se cambio el estado del nav");
  }


  return (
    <header>
      <div className="flex flex-col gap-5 w-full">
        <section className="fixed flex flex-row justify-between w-full h-auto sm:h-auto px-5 py-4 sm:px-10 sm:py-5 items-center bg-back/80 backdrop-blur-sm z-50">
          <a href="/login" className="hidden sm:flex px-5 py-2 sm:px-3 w-auto rounded-2xl bg-primary text-white hover:bg-back hover:ring-1 hover:text-text hover:ring-text/50 font-medium text-xl text-nowrap">Iniciar Sesión</a>
          <div className="h-full w-full flex flex-row items-center justify-center gap-2">
            <img
              src="/assets/icons/icon.svg"
              alt="icono usuario"
              className="h-11 w-11 sm:h-18 sm:w-18"
            />
            <h1 className="text-3xl sm:text-5xl font-extrabold text-text text-center">Vaultly</h1>
            <div className="fixed right-10 w-12 h-12 flex justify-center items-center sm:hidden">
              <button onClick={handlerNav} className="w-10 h-10 active:bg-secondary-text/50 rounded-xl flex justify-center items-center">
                <img src="/assets/icons/toggle.svg" alt="Icono de menú desplegable" className="w-6 h-6"/>
              </button>
            </div>
          </div>
          <a href="/register" className="hidden sm:flex px-5 py-2 w-auto rounded-2xl bg-back text-text ring-1 ring-text/50 hover:bg-secondary hover:text-white hover:ring-0 font-medium text-xl active:bg-secondary active:text-white">Registrarse</a>
          {isOpen && (
            <div className="fixed top-[76px] inset-0 bg-back/80 backdrop-blur-sm z-50 w-full h-full py-10 px-5 flex flex-row justify-around items-center gap-5 rounded-b-3xl">
              <a href="/login" className="px-5 py-2 w-auto rounded-2xl bg-primary text-white active:bg-back active:ring-1 active:text-text active:ring-text/50 font-medium text-[16px] sm:text-xl">Iniciar Sesión</a>
              <a href="/register" className="px-7 py-2 w-auto rounded-2xl bg-back text-text ring-1 ring-text/50 hover:bg-secondary hover:text-white hover:ring-0 font-medium text-[16px] sm:text-xl">Registrarse</a>
            </div>
          )}
        </section>
        <hr className="fixed w-full text-text top-[76px] sm:top-28"/>
      </div>
    </header>
  )
}


