import type { APIRoute } from "astro";
import { login } from "../../../services/cognitoService";


export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { email, password } = body;

    if(!email || !password) {
        return new Response(JSON.stringify({ ok: false, message: "Email and password are required."}),
        {status: 400})
    }


    const result = await login(email, password);

    if((await result).message === "El usuario no esta confirmado.") {
        return new Response(JSON.stringify({ok: false, message: (await result).message}))
    }

    if((await result).message === "Contraseña incorrecta o usuario inválido.") {
        return new Response(JSON.stringify({ok: false, message: (await result).message}))
    }

    if((await result).message === "No existe un usuario con ese correo.") {
        return new Response(JSON.stringify({ok: false, message: (await result).message}))
    }

    if((await result).message === "Ocurrió un error al iniciar sesión.") {
        return new Response(JSON.stringify({ok: false, message: (await result).message}))
    }

    return new Response(JSON.stringify({
        ok: true,
        message: "Login exitoso",
        token: (await result.ok)
    }))
    

};