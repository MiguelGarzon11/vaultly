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

    const token = result?.data?.AccessToken;

    if (!token) {
        console.log(JSON.stringify({ ok: true, message: "User logged in successfully." }));
    }

    const cookie = `authToken=${token}; Path=/; Max-Age=${60 * 60 * 24};`

    return console.log(JSON.stringify({ ok: true, message: "User logged in successfully.", token: token }),
        {
            status: 200,
            headers: {
                "Set-Cookie": cookie,
                "Content-Type": "application/json",
            },
        })
};