import { defineAction } from "astro:actions";
import { z } from "zod";
import { navigate } from "astro/virtual-modules/transitions-router.js";

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
                const res = await fetch("http://localhost:4321/api/auth/register", {
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

                return {
                    ok: true,
                    message: data.message,
                    detail: "Confirma el correo.",
                    username: input.email
                };

            } catch (error: any) {

                switch (error.name) {
                    case "UsernameExistsException":
                        return {ok: false, message: "El usuario ya existe.", error: error.name};

                    case "InvalidPasswordException":
                        return {ok: false, message: "Contraseña inválida:", error: error.name};

                    case "CodeDeliveryFailureException":
                        return {ok: false, message: "Error al enviar el código de verificación.", error: error.name};
                    
                    case "NotAuthorizedException":
                        return {ok: false, message: "La app client no tiene permisos para usar SignUp.", error: error.name};

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
                const res = await fetch('http://localhost:4321/api/auth/login', {
                    method: "POST",
                    body: JSON.stringify({
                        email: input.email,
                        password: input.password
                    }),
                });

                const data = await res.json();

                if (data.ok === false) {
                    if((await data).message === "El usuario no esta confirmado.") {
                        return {
                        ok: false,
                        alert: {
                            type: "error",
                            message: "No se puedo iniciar sesión.",
                            detail: data.message,
                            }
                        }}

                    if((await data).message === "Contraseña incorrecta o usuario inválido.") {
                        return {
                        ok: false,
                        alert: {
                            type: "error",
                            message: "No se puedo iniciar sesión.",
                            detail: data.message,
                            }
                        }}
                    
                    if((await data).message === "No existe un usuario con ese correo.") {
                        return {
                        ok: false,
                        alert: {
                            type: "error",
                            message: "No se puedo iniciar sesión.",
                            detail: data.message,
                            }
                        }}

                    if((await data).message === "Ocurrió un error al iniciar sesión.") {
                        return {
                        ok: false,
                        alert: {
                            type: "error",
                            message: "No se puedo iniciar sesión.",
                            detail: data.message,
                            }
                        }}
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
            code: z.number().max(6).min(6)
        }),
        async handler(input) {
            try {
                const res = await fetch("http://localhost:4321/api/auth/confirmcode", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        code: input.code
                    }),
                });

                const data = await res.json();

                return {
                    ok: true,
                    message: data.message,
                    detail: "Confirma el correo."
                };


            }  catch (error: any) {

                switch (error.name) {
                    case "CodeMismatchException":
                        return {ok: false, message: "El código que el usuario ingresó no coincide.", error: error.name};

                    case "ExpiredCodeException":
                        return {ok: false, message: "El código ha expirado.", error: error.name};

                    case "UserNotFoundException":
                        return {ok: false, message: "No existe un usuario registrado con ese correo.", error: error.name};
                    
                    case "InvalidParameterException":
                        return {ok: false, message: "Parametros invalidos.", error: error.name};

                    default:
                        console.error("Error desconocido:", error);
                }
            }
        }
    })
}