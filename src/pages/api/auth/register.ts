import type { APIRoute } from "astro";
import { register } from "../../../services/cognitoService";

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
        return new Response(
            JSON.stringify({ ok: false, message: "Email and password are required." }),
            { status: 400 }
        );
    }

    const result = await register(email, password);

    if (result?.ok === true) {
        return new Response(
            JSON.stringify({ ok: true, message: "User registered successfully.", status: 200, username: result.data?.Destination }),
        );
    } else {
        return new Response(
            JSON.stringify({ ok: false, message: result?.message, error: result?.error }), { status: 400 }
        );
    }

}