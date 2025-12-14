import { createPortal } from "react-dom";
import { useState } from "react";
import clsx from "clsx";
import { iconForIntegration } from "astro/runtime/client/dev-toolbar/apps/utils/icons.js";

interface CategoryProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateCategoryModal({isOpen, onOpenChange
}: CategoryProps) {

  const [title, setTitle] = useState("Nombre nueva categoria");
  const [color, setColor] = useState("#3b82f6");
  const [icon, setIcon] = useState("/assets/iconsC/compras.svg");

  if (!isOpen) return null; 

  const colors = [
    { name: "red", code: "#ED4626"},
    { name: "orange", code: "#ED8E1A"},
    { name: "yellow", code: "#F4D50B"},
    { name: "green", code: "#10b981"},
    { name: "cyan", code: "#0BC5F4"},
    { name: "blue", code: "#3b82f6"},
    { name: "purple", code: "#8B1AED"},
    { name: "pink", code: "#ED1AE7"}
  ] 

  const icons = [
    {name: "compras", ref: "/assets/iconsC/compras.svg"},
  ]
  return createPortal (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black-10 backdrop-blur-xs" onClick={() => onOpenChange(false)}>

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:max-w-[600px] bg-white h-[500px] transition-all duration-200 rounded-t-xl rounded-b-3xl overflow-hidden drop-shadow-xl flex flex-col justify-start items-center" onClick={(e) => e.stopPropagation()}>
              <div className="h-[45%] w-full px-8" style={{backgroundColor: color }}>
                  {/* Vista previa */}
                  <section className="flex flex-col size-full gap-5 justify-center items-start">
                    <h1 className="text-white text-lg font-medium">Nueva Categoría</h1>
                    <div className="flex w-full space-x-3 items-center">
                      <div className="size-12 rounded-xl flex justify-center items-center" style={{backgroundColor: `color-mix(in srgb, ${color} 80%, white)` }}>
                        <svg className="size-8 text-white">
                          <use href="/assets/iconsC/compras.svg"></use>
                        </svg>
                      </div>
                      <div className="flex flex-col justify-start items-start">
                          <p className="text-white font-extralight text-sm">Vista previa</p>
                          <h1 className="text-white text-lg font-medium">{title}</h1>
                      </div>
                    </div>
                  </section>

                  {/* Boton de cerrado */}
                  <button className="absolute size-6 top-3 right-3 flex justify-center items-center hover:bg-white/5 active:bg-white/5 rounded-lg" onClick={() => onOpenChange(false)}>
                    <svg className="size-6" style={{color: `color-mix(in srgb, ${color} 80%, black)`}}>
                          <use href="/assets/icons/x.svg"></use>
                    </svg>
                  </button>
              </div>
              {/* Formulario */}
              <section className="size-full">
                <form className="size-full px-16 py-6 flex flex-col space-y-4">
                  {/* Nombre de la categoría */}
                    <div className="flex flex-col space-y-2 w-">
                      <label htmlFor="title" className="text-text text-sm font-medium">Nombre de la categoría</label>
                      <input type="text" name="title" id="titleCategory" className="h-8 w-full bg-dark-back rounded-lg px-2 text-sm text-text font-light" placeholder="Ej: Supermercado, Entretenimiento, Gym..."/>
                    </div>
                  {/* Monto máximo */}
                    <div className="flex flex-col space-y-2 relative">
                      <label htmlFor="title" className="text-text text-sm font-medium">Monto máximo mensual</label>
                      <input type="number" name="amount_max" id="titleCategory" className="h-8 w-full bg-dark-back rounded-lg pl-12 text-sm text-text font-light" placeholder="0.00"/>
                      <p className="absolute top-9 left-2 text-xs">COP</p>
                    </div>
                  {/* Color */}
                    <div className="flex flex-col size-full space-y-2">
                      <p className="text-text text-sm font-medium">Color</p>
                      <div className="flex flex-wrap size-full space-x-4 justify-center">
                          {colors.map((c) => (
                            <button type="button" className={clsx("size-7 hover:scale-105", color === c.code ? "scale-110 ring-5 ring-secondary-text/30 rounded-full transition-all duration-150" : null)}
                              onClick={(e) => {
                                e.stopPropagation();
                                setColor(c.code);
                              }}>
                              <div className="size-full rounded-full flex justify-center items-center" style={{backgroundColor: c.code}}>
                                {c.code === color && (
                                  <div className="size-2 bg-white rounded-full transition-all duration-150"></div>
                                )} 
                              </div>
                            </button>
                            
                          ))}
                      </div>
                    </div>
                  {/* Icono */}
                    <div className="flex flex-col size-full space-y-2">
                      <p className="text-text text-sm font-medium">Icono</p>
                      <div className="flex flex-wrap size-full space-x-4 justify-center">
                          {icons.map((i) => (
                            <button type="button">
                              <div className="flex p-2 size-10 rounded-lg items-center justify-center" style={{backgroundColor: `color-mix(in srgb, ${color} 10%, white)`}}> 
                                <svg className="size-7" style={{color: `color-mix(in srgb, ${color} 80%, white)`}}>
                                  <use href={i.ref}></use>
                                </svg>
                              </div>
                            </button>
                          ))}
                      </div>

                    </div>

                </form>
              </section>
                
          </div> 
        </div>

      </div>
    </>,
    document.body
  );

}