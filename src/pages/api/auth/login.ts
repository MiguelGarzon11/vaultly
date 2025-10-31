import type { APIRoute } from "astro";
import { login } from "../../../services/cognitoService";

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
        return new Response(
            JSON.stringify({ ok: false, message: "Email and password are required." }),
            { status: 400 }
        );
    }

    const result = await login(email, password);

    if (result.success) {
        return new Response(
            JSON.stringify({ ok: true, message: "User logged in successfully." }),
            { status: 200 }
        );
    } else {
        return new Response(
            JSON.stringify({ ok: false, message: "Error al iniciar sesión" }),
            { status: 500 }
        )
    }
}