import { appStorage } from "./appStorage";

export function authHeader(isFormData) {
    // return authorization header with jwt token
    if (isAuthValid()) {
        let token = appStorage.getToken();

        if (token) {
            if (!isFormData) {
                return {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'Accept-Charset': 'UTF-8'
                };
            } else {
                return {
                    'Authorization': 'Bearer ' + token,
                    'Accept-Charset': 'UTF-8'
                };
            }
        } else {
            appStorage.logout();

            location.reload(true);
        }
    }
}

function isAuthValid() {
    let tokenDate = appStorage.getLoginDate();
    tokenDate = new Date(tokenDate);
    const horaActual = new Date();
    horaActual.toLocaleDateString();
    let diferencia = horaActual - tokenDate;
    diferencia = Math.round(((diferencia % 86400000) % 3600000) / 60000);

    if (diferencia > 1430) {
        alert("Quedan 10 minutos de sesión, se recomienda iniciar sesión nuevamente.")
    }

    if (diferencia > 1440) {
        appStorage.logout();

        location.reload(true);
    }

    return true;
}

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            let error = (data && data.message) || response.statusText;

            if (response.status === 401) {
                error = 'El usuario o la contraseña son incorrectos.'
            }
            if (response.status === 403) {
                error = 'No tiene permisos para realizar esta operación.'

                appStorage.logout();

                window.location.reload();
            }

            return Promise.reject(error);
        }

        return data;
    });
}