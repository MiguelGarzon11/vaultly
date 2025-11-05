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

        return { ok: true, data: response }

    } catch (error: any) {
        
        switch (error.name) {

            case "UsernameExistsException":
                return {ok: false, message: "El usuario ya existe.", error: error.name};

            case "InvalidPasswordException":
                return {ok: false, message: "Contraseña inválida.", error: error.name};

            case "CodeDeliveryFailureException":
                return {ok: false, message: "Error al enviar el código de verificación.", error: error.name};
            
            case "NotAuthorizedException":
                return {ok: false, message: "La app client no tiene permisos para usar SignUp.", error: error.name};

            default:
                console.error("Error desconocido:", error);
        }
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
            return {ok: false, message: error.name}
        }

        if (error.name === "NotAuthorizedException") {
            return {ok: false, message: error.name}
        }

        if (error.name === "UserNotFoundException") {
            return { ok: false, message: error.name };
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

    } catch (error: any) {

        switch (error.name) {
            case "CodeMismatchException":
                return {ok: false, message: "El código que el usuario ingresó no coincide.", error: error.name};

            case "ExpiredCodeException":
                return {ok: false, message: "El código ha expirado.", error: error.name};

            case "UserNotFoundException":
                return {ok: false, message: "No existe un usuario registrado con ese correo.", error: error.name};
            
            case "InvalidParameterException":
                return {ok: false, message: "Parametros invalidos.", error: error.name};

            default:
                console.error("Error desconocido:", error);
        }
    }
}