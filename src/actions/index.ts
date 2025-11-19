import { defineAction } from "astro:actions";
import { z } from "zod";

export const server = {
    register: defineAction({
        accept: "form",
        input: z.object({
            email: z.string().email("Email no válido"),
            password: z.string().min(6, "La contraseña debe tener al menos 8 caracteres"),
            cPassword: z.string().min(6),
        }).refine(data => data.password === data.cPassword, {
            message: "Las contraseñas no coinciden",
            path: ["cPassword"],
        }),

        async handler(input) {
            try {
                const API_BASE = import.meta.env.PUBLIC_API_URL_AUTH

                const res = await fetch(`${API_BASE}register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: input.email,
                        password: input.password,
                    }),
                });

                const data = await res.json();

                if (!res.ok || data.ok === false) {
                    throw { name: data.error || "RegisterError", message: data.message }
                }

                console.log({ ok: data.ok, message: data.message, detail: data.detail })

                return {
                    ok: true,
                    message: data.message,
                    detail: "Confirma el correo.",
                    username: data.username
                };

            } catch (error: any) {

                switch (error.name) {
                    case "UsernameExistsException":
                        return { ok: false, message: "El usuario ya existe.", error: error.name };

                    case "InvalidPasswordException":
                        return { ok: false, message: "Contraseña no permitida.", error: error.name };

                    default:
                        console.error("Error desconocido:", error);
                }
            }
        }
    }),

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
                    body: JSON.stringify({
                        email: input.email,
                        password: input.password
                    }),
                });

                const data = await res.json();

                if (data.ok === false) {
                    if ((await data).message === "El usuario no esta confirmado.") {
                        return {
                            ok: false,
                            alert: {
                                type: "error",
                                message: "No se puedo iniciar sesión.",
                                detail: data.message,
                            }
                        }
                    }

                    if ((await data).message === "Contraseña incorrecta o usuario inválido.") {
                        return {
                            ok: false,
                            alert: {
                                type: "error",
                                message: "No se puedo iniciar sesión.",
                                detail: data.message,
                            }
                        }
                    }

                    if ((await data).message === "No existe un usuario con ese correo.") {
                        return {
                            ok: false,
                            alert: {
                                type: "error",
                                message: "No se puedo iniciar sesión.",
                                detail: data.message,
                            }
                        }
                    }

                    if ((await data).message === "Ocurrió un error al iniciar sesión.") {
                        return {
                            ok: false,
                            alert: {
                                type: "error",
                                message: "No se puedo iniciar sesión.",
                                detail: data.message,
                            }
                        }
                    }
                }

                return {
                    ok: true,
                    message: data.message,
                    alert: {
                        type: "success",
                        message: "Inicio de sesión exitoso.",
                        detail: null,
                    }
                };
            } catch (error) {
                return {
                    ok: false,
                    message: (error),
                };
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