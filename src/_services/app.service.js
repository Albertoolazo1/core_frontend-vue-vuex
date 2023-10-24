import { config } from '@/_config'
import { handleResponse } from '@/_helpers';

const BASE_URL = config.SOCKET_URL + '/generics';

export const appService = {
    changePassword,
    getVerificationCode,
    validateCode,
};

function changePassword(itemRequest) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemRequest)
    };

    return fetch(BASE_URL + '/validateCodigoVerificacion', requestOptions)
        .then(handleResponse)
        .then(response => {

            return response;
        });
}
