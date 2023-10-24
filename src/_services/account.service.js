import { config } from '../_config'
import { appStorage } from '../_helpers';
import { authHeader, handleResponse } from '@/_helpers';

const BASE_URL = config.API_URL + 'catalogo/Usuario';

export const accountService = {
    login,
    logout,
    signup,
    showRecords,
    saveRecord,
    getCodigoVerificacion,
    validateCodigoVerificacion,
    changePassword,
    deleteRecord,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept-Charset': 'UTF-8' },
        body: JSON.stringify({ username, password })
    };

    return fetch(config.API_URL + 'login', requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function logout() {
    appStorage.logout();
}

function signup(item) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };

    return fetch(config.URL + 'generics/saveRecordUsuario', requestOptions)
        .then(handleResponse)
        .then(response => {


            return response;
        });
}

function showRecords(itemRequest) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(itemRequest)
    };

    return fetch(BASE_URL + '/showRecords', requestOptions)
        .then(handleResponse)
        .then(response => {

            return response;
        });
}

function getCodigoVerificacion(item) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };

    return fetch(config.URL + 'generics/getCodigoVerificacion', requestOptions)
        .then(handleResponse)
        .then(response => {


            return response;
        });
}

function validateCodigoVerificacion(item) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };

    return fetch(config.URL + 'generics/validateCodigoVerificacion', requestOptions)
        .then(handleResponse)
        .then(response => {


            return response;
        });
}

function changePassword(item) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };

    return fetch(config.URL + 'generics/changePassword', requestOptions)
        .then(handleResponse)
        .then(response => {


            return response;
        });
}

function saveRecord(item) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };

    return fetch(config.URL + 'generics/saveRecordUsuario', requestOptions)
        .then(handleResponse)
        .then(response => {


            return response;
        });
}

function deleteRecord(item) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(item)
    };

    return fetch(BASE_URL + '/deleteRecord/' + item.id, requestOptions)
        .then(handleResponse)
        .then(response => {

            return response;
        });
}
