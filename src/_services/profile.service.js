import { config } from '@/_config'
import { authHeader, handleResponse } from '@/_helpers';

const BASE_URL = config.API_URL + 'catalogo/Usuario';
export const usuarioService = {
    changePassword,
    getVerificationCode,
    validateCode,
};

function changePassword(itemRequest) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(itemRequest)
    };

    return fetch(BASE_URL + '/changePassword', requestOptions)
        .then(handleResponse)
        .then(response => {

            return response;
        });
}

function getVerificationCode(itemRequest) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(itemRequest)
    };

    return fetch(BASE_URL + '/getCodigoVerificacion', requestOptions)
        .then(handleResponse)
        .then(response => {

            return response;
        });
}

function validateCode(itemRequest) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(itemRequest)
    };

    return fetch(BASE_URL + '/validateCodigoVerificacion', requestOptions)
        .then(handleResponse)
        .then(response => {

            return response;
        });
}
