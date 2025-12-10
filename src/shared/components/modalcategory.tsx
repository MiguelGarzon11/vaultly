import React from "react";
import clsx from "clsx";

export default function ModalCategory() {
    return (
        <div className="w-[95%] sm:w-[65%] md:max-w-[900px] bg-white rounded-2xl h-[500px] ring-1 ring-secondary-text/25 overflow-hidden relative z-50" id="modal">
            <div className="absolute w-full h-[30%] bg-purple-500 p-10 justify-center items-center gap-5">
                <h1 className="text-sm:text-2xl text-white font-medium">Nueva categoria</h1>
                <div className="flex justify-start items-center space-x-5">
                    <div className="bg-purple-400 p-2 rounded-2xl mt-3">
                        <img src="/assets/icons/presup.svg" alt="Icono nueva categoria" className="size-8"/>
                    </div>
                    <div className="flex flex-col justify-center items-start mt-3">
                        <p className="text-sm font-extralight text-white">Vista previa</p>
                        <h1 className="text-lg font-medium text-white">Nombre de la categoría</h1>
                    </div>

                </div>
                <button className="active:scale-95 hover:scale-105 flex justify-center items-center absolute top-5 right-5">
                    <svg className="text-purple-700 size-6">
                        <use href="/assets/icons/x.svg"></use>
                    </svg>
                </button>
                
            </div>
            <form>

            </form>
        </div>
    )
}





