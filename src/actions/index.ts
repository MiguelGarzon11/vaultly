import { defineAction } from "astro:actions";
import { z } from "zod";

export const server = {

    login: defineAction({
        accept: "form",
        input: z.object({
            email: z.string().email(),
            password: z.string().min(6),
        }),
        async handler(input) {
            try {

                const API_BASE = import.meta.env.PUBLIC_API_URL_AUTH

                const res = await fetch(`${API_BASE}login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        email: input.email,
                        password: input.password
                    }),
                });

                const data = await res.json();

                if (data.ok === false || !res.ok) {
                    throw { name: data.error || "LoginError", message: data.message }
                }

                console.log({ ok: data.ok, message: data.message, detail: data.detail })

                return { ok: true, message: data.message, token: data.token, username: data.username}


            } catch (error: any) {

                console.log(error)

                switch (error.name) {
                    case "UsernameExistsException":
                        return { ok: false, message: "El usuario ya existe.", error: error.name };

                    case "InvalidPasswordException":
                        return { ok: false, message: "Contraseña no permitida.", error: error.name };
                    
                    case "UserNotConfirmedException" : 
                        return { ok: false, message: "Correo electrónico no verificado."}

                    case "NotAuthorizedException": 
                        return { ok: false, message: "Contraseña o correo incorrectos.", error: error.name }

                    case "UserNotFoundException": 
                        return { ok: false, message: "Usuario no registrado.", error: error.name }

                    default:
                        console.error("Error desconocido:", error);
                }
            }
        }
    }),

    register: defineAction({
        accept: "form",
        input: z.object({
            email: z.string().email("Email no válido"),
            password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
            cPassword: z.string().min(8),
        }).refine(data => data.password === data.cPassword, {
            message: "Las contraseñas no coinciden",
            path: ["cPassword"],
        }),

        async handler(input) {
            try {
                const API_BASE = import.meta.env.PUBLIC_API_URL_AUTH;
                const url = `${API_BASE}register`;

                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        email: input.email,
                        password: input.password,
                    }),
                });

                const data = await res.json();

                if (!res.ok || data.ok === false) {
                    throw { 
                        name: data.error || "RegisterError", 
                        message: data.message || "Error desconocido" 
                    };
                }

                return { ok: true, message: data.message, username: input.email };

            } catch (error: any) {

                switch (error.name) {
                    case "UsernameExistsException":
                        return { ok: false, message: "El usuario ya existe.", error: error.name };

                    case "InvalidPasswordException":
                        return { ok: false, message: "Contraseña no permitida.", error: error.name };

                    default:
                        console.error("Error desconocido:", error);

                        return { ok: false, message: error.message || "Error desconocido", error: error.name || "UnknownError", username: input.email}

                }
            }
        } 
    }),

    confirmCode: defineAction({
        accept: "form",
        input: z.object({
            code: z.string(),
            username: z.string().email()
        }),
        async handler(input) {
            try {

                const API_BASE = import.meta.env.PUBLIC_API_URL_AUTH

                const res = await fetch(`${API_BASE}confirmcode`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        code: input.code,
                        username: input.username
                    }),
                });

                const data = await res.json();

                if (data.error) {
                    console.error("ERROR DEL SERVIDOR:", data.error )
                    return {ok: false, error: data.error}
                }

                if (!data.ok) {
                    console.error("API Respondío error: ", data.message)
                    return {
                        ok: false,
                        message: data.message || "Error al confirmar el código",
                    };
                }

                console.log({ ok: data.ok, message: data.message, detail: data.detail })
                return {
                    ok: true,
                    message: data.message,
                    detail: "Correo confirmado"
                };


            } catch (error: any) {

                switch (error.name) {
                    case "CodeMismatchException":
                        return { ok: false, message: "El código que el usuario ingresó no coincide.", error: error.name };

                    case "ExpiredCodeException":
                        return { ok: false, message: "El código ha expirado.", error: error.name };

                    case "UserNotFoundException":
                        return { ok: false, message: "No existe un usuario registrado con ese correo.", error: error.name };

                    case "InvalidParameterException":
                        return { ok: false, message: "Parametros invalidos.", error: error.name };

                    default:
                        console.error("Error desconocido:", error);
                }
            }
        }
    })
}

   