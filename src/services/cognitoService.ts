import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
    region: import.meta.env.AWS_REGION,
});

export async function rregisterUserIncognito(email: string, password: string) {
    try {
        const command = new SignUpCommand({
            ClientId: import.meta.env.COGNITO_CLIENT_ID,
            Username: email,
            Password: password,
        });

        const response = await client.send(command);
        return { success: true, userSub: response.UserSub };
    } catch (error) {
        console.error("Error registering user:", error);
        return { success: false, message: error.message };
    }
}