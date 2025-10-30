import { defineAction } from "astro:actions";
import { z } from "zod";

export const actions = {
    register: defineAction({
        accept: 'form',
        input: z.object({
            email: z.string().email(),
            password: z.string().min(8),
            cPassword: z.string().min(8),
        }),
        handler: async ({ email, password, cPassword }) => {
            try {
                if (password !== cPassword) {
                    return { success: false, message: "Las contraseñas no coinciden" };
                }

                const response = await fetch("http://localhost:4321/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (data.success) {
                    return {
                        success: true,
                        message: "Revisa tu correo por el código de confirmación"
                    }
                };

                return { success: false, message: data.message || "Error al registrar" };
            } catch (error) {
                console.error("Error en la action de register: ", error);
                return { success: false, message: "Error en el servidor" };
            }
        }
    }),

    login: defineAction({
        accept: "form",
        input: z.object({
            email: z.string().email(),
            password: z.string().min(6),
        }),
        handler: async ({email, password}) => {
            try {
                const response = await fetch("http://localhost:4321/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({email, password}),
                });

                const data = await response.json();

                if (data.success) {
                    return {
                        success: true,
                        message: "Inicio de sesión exitoso"
                    }
                };

                return { success: false, message: data.message || "Error al iniciar sesión" };
            } catch (error) {
                console.error("Error en la action de login: ", error);
                return { success: false, message: "Error en el servidor" };
            }
        }
    })
};