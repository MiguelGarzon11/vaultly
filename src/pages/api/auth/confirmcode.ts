import type { APIRoute } from "astro";
import { confirmCode } from "../../../services/cognitoService";

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { code, username } = body;

    if (!code) {
        return new Response(
            JSON.stringify({ ok: false, message: "No code" }),
            { status: 200 }
        );
    }

    const result = await confirmCode(username, code);

    if (result?.ok === true) {
        return new Response(
            JSON.stringify({ ok: true, message: "User registered successfully.", status: 200}),
        );
    } else {
        return new Response(
            JSON.stringify({ ok: false, message: "Error registering user.", error: result?.error })
        );
    }

}