import React from "react";
import { actions } from "astro:actions";
import { useNotification } from "../hooks/useNotification";

export default function Loginform() {
    const { notify } = useNotification();

    


    return (
        <form className="flex flex-col justify-center items-center w-full px-5 py-10 sm:p-10 gap-5">
        <input
          type="email"
          name="email"
          id="login"
          placeholder="myemail@example.com"
        />
        <input
          type="password"
          name="password"
          id="login"
          placeholder="Your password"
        />
        <a
          href=""
          className="text-start w-full text-primary/80 hover:text-primary/100"
          >¿Olvido su contraseña?</a>
        <button id="button">Ingresar</button>
      </form>
    )
}