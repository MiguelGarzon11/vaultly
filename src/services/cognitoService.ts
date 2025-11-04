import { CognitoIdentityProviderClient, SignUpCommand, AuthFlowType, ConfirmSignUpCommand, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

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
        AuthFlow: "USER_PASSWORD_AUTH" as AuthFlowType,
        ClientId: import.meta.env.COGNITO_CLIENT_ID,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password
        },
    };


    try {
        const command = new InitiateAuthCommand(input);
        const response = await client.send(command);

        return {ok: true, data: response}

    } catch (error: any) {
        

        if (error.name === "UserNotConfirmedException") {
            return {ok: false, message: "El usuario no esta confirmado."}
        }

        if (error.name === "NotAuthorizedException") {
            return {ok: false, message: "Contraseña incorrecta o usuario inválido."}
        }

        if (error.name === "UserNotFoundException") {
            return { ok: false, message: "No existe un usuario con ese correo." };
        }

        console.error("Error desconocido:", error);
        return {ok: false, message: "Ocurrió un error al iniciar sesión."}
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