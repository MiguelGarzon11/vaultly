import React from "react";
import { useState } from "react";

import CreateCategoryModal from "../shared/components/CreateCategoryModal";

export default function CreateCategoryWrapper() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Sección de información sin categorías */}
            <div className="flex flex-col w-full col-span-3 justify-center items-center gap-2 mt-10">
                <div className="p-3 bg-secondary/15 rounded-2xl">
                    <img src="/assets/icons/categblue.svg" alt="Icono de frase No tiene categorias creadas" className="size-10"/>
                </div>
                <h1 className="text-text font-medium text-lg">No hay categorías aún</h1>
                <p className="text-center w-[90%] font-extralight text-secondary-text text-[16px]">Crea tu primera categoría para empezar a organizar tus gastos y mantener el control de tu presupuesto.</p>
                <button className="bg-primary px-3 sm:px-5 py-3 rounded-full sm:rounded-2xl flex justify-between gap-3 active:scale-95 hover:bg-primary/80 mt-5" id="buttonNewCategory" onClick={() => setIsOpen(true)}>
                <img src="/assets/icons/plus.svg" alt="Icono boton de nueva transacción" className="size-4 sm:size-5" /> 
                <p className="flex text-sm font-extralight text-white">Nueva Categoría</p>
                </button>
            </div>
            {/* Modal */}
            <CreateCategoryModal isOpen={isOpen} onOpenChange={setIsOpen}></CreateCategoryModal>
        </>

    )
}