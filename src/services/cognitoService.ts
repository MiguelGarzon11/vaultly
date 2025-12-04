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

        console.log(response.CodeDeliveryDetails);
        return { ok: true, message: "Usuario registrado con éxito.", data: response.CodeDeliveryDetails }

    } catch (error: any) {
        return { ok: false, message: error.name || "No se pudo registrar el usuario.", error: error.name}
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

        console.log(response.$metadata)
        return {ok: true, message: "Login successfully.", data: response.AuthenticationResult, username: email }

    } catch (error: any) {
        return { ok: false, message: error.message || "No se pudo iniciar sesión.",error: error.name}
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

        if (response.$metadata.httpStatusCode !== 200) {
            return { ok: false, message: "Error confirmando el código." }
        }

        return { ok: true, message: response }

    } catch (error: any) {

        switch (error.name) {
            case "CodeMismatchException":
                return { ok: false, message: "El código que el usuario ingresó no coincide.", error: error.name };

            case "ExpiredCodeException":
                return { ok: false, message: "El código ha expirado.", error: error.name };

            case "UserNotFoundException":
                return { ok: false, message: "No existe un usuario registrado con ese correo.", error: error.name };

            case "InvalidParameterException":
                return { ok: false, message: "Parametros invalidos.", error: error.name };

            default:
                console.error("Error desconocido:", error.name);
                return { ok: false, message: "Error desconocido al confirmar el código.", error: error.name };
        }
    }
}