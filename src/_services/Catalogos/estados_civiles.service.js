import { config } from '@/_config'
import { authHeader, handleResponse } from '@/_helpers';

const BASE_URL = config.API_URL + 'catalogo/EstadoCivil';
export const estadosCivilesService = {
    showRecords,
    saveRecord,
    deleteRecord,
};

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
function saveRecord(itemRequest) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(itemRequest)
    };

    return fetch(BASE_URL + '/saveRecord', requestOptions)
        .then(handleResponse)
        .then(response => {

            return response;
        });
}
function deleteRecord(itemRequest) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(itemRequest)
    };

    return fetch(BASE_URL + '/deleteRecord', requestOptions)
        .then(handleResponse)
        .then(response => {

            return response;
        });
}
