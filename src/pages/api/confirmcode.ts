import type { APIRoute } from "astro";
import { confirmCode } from "../../services/cognitoService";

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { code, username } = body;

    if (!code || !username) {
        return new Response(
            JSON.stringify({ ok: false, message: "No code or username." }),
            { status: 400 }
        );
    }

    const result = await confirmCode(username, code);

    if (result?.ok === true) {
        return new Response(
            JSON.stringify({ ok: true, message: "Confirmation email successfully." }),
            { status: 200 }
        ); 

    } else {
        return new Response(
            JSON.stringify({ ok: false, message: "Error registering user.", error: result?.error }), { status: 400 }
        );
    }

}