import type { APIRoute } from "astro";
import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
    region: import.meta.env.AWS_REGION,
});

export const POST: APIRoute = async ({ request }) => {
    try {
        const { email, password } = await request.json();

        const command = new SignUpCommand({
            ClientId: import.meta.env.COGNITO_CLIENT_ID,
            Username: email,
            Password: password,
        });

        const result = await client.send(command);

        return new Response(JSON.stringify({ success: true, data: result }), {
            status: 200,
        });
    } catch (error: any) {
        console.error("Error al registrar en Cognito:", error);
        return new Response(
            JSON.stringify({ success: false, message: error.message || "Error en Cognito" }),
            { status: 500 }
        );
    }
};