import { CognitoIdentityProviderClient, AdminInitiateAuthCommand, SignUpCommand, AuthFlowType, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
    region: import.meta.env.AWS_REGION,
});


export async function register(email: string, password: string) {
    try {
        const command = new SignUpCommand({
            ClientId: import.meta.env.COGNITO_CLIENT_ID,
            Username: email,
            Password: password,
        });

        const response = await client.send(command);

        return { success: true, data: response }

    } catch (error) {
        console.error("Error registrando usuario en cognito", error);
        return { success: false, error }
    }
}

export async function login(email: string, password: string) {

    const input = {
        AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
        ClientId: import.meta.env.COGNITO_CLIENT_ID,
        UserPoolId: import.meta.env.COGNITO_USER_POOL_ID,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password
        },
    };


    try {
        const command = new AdminInitiateAuthCommand(input);
        const response = await client.send(command);

        console.log("Tokens: ", response.AuthenticationResult);
        return {
            success: true, data: {
                AccessToken: response.AuthenticationResult?.AccessToken,
                IdToken: response.AuthenticationResult?.IdToken,
                RefreshToken: response.AuthenticationResult?.RefreshToken
            }
        }

    } catch (error) {
        return { success: false, error };
        console.error("Error de autentificación: ", error)
    }
}

export async function logout() { }

export async function forwardPasswordReset() { }

export async function confirmCode(username: string, code: string) {
    try {
        const command = new ConfirmSignUpCommand({
            ClientId: import.meta.env.COGNITO_CLIENT_ID,
            Username: username,
            ConfirmationCode: code,
        });

        const response = await client.send(command)
        return { success: true, message: response }
    } catch (error) {
        console.error("Error confirmando código:", error);
        return { success: false, message: error }
    }
}