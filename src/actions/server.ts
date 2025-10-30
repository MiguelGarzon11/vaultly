import { defineAction } from "astro:actions";
import { z } from "zod";

export const server = {
    register: defineAction({
        accept: 'form',
        input: z.object({
            email: z.string().email(),
            password: z.string().min(8),
        }),
        handler: async ({ email, password }) => {
            try {
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
    })
};