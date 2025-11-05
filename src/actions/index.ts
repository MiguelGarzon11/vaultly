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

                if(data.ok === false) {
                    
                }

                return {
                    ok: true,
                    message: data.message,
                };

            } catch (error) {
                return {
                    ok: false,
                    message: "Error al registrar usuario",
                };
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

                if (!res.ok) {
                    throw new Error(data.error || "Error al registrar usuario");
                }

                return {
                    ok: true,
                    message: data.message,
                };
            } catch {
                return {
                    ok: false,
                    message: "Error al registrar usuario",
                };
            }
        }
    })
}