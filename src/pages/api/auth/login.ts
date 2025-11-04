import type { APIRoute } from "astro";
import { login } from "../../../services/cognitoService";


export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { email, password } = body;

    if(!email || !password) {
        return new Response(
            JSON.stringify({ ok: false, message: "Email and password are required."}),
            { status: 400, headers: {"Content-Type": "application/json" }}
        )
    }

    const result = login(email, password)

    if((await result).message === "El usuario no esta confirmado.") {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/register/confirmcode",
            },
        });
    }

    if((await result).message === "No existe un usuario con ese correo.") {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/register"
            }
        })
    }

    return new Response(JSON.stringify({
        ok: true,
        message: "Login exitoso"
    }))

};