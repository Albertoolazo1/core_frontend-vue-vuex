import { diasFestivosService } from '../../../_services';

const SERVICE = diasFestivosService;

const actions = {
    obtenerCalendariosDiasFestivos({ dispatch, commit }, itemRequest) {
        let loadingItem = {
            movimiento: 0,
            title: 'Obteniendo Calendarios',
        }
        dispatch('app/chargeLoadingsToShow', loadingItem, { root: true });
        commit('diasFestivosController/mutateLoadingObtenerDatos', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        SERVICE.show(itemRequest)
            .then(
                response => {
                    const { code, body, message } = response;

                    if (code != 0) {
                        dispatch('diasFestivosController/procesarCalendarios', body, { root: true });
                    } else {
                        dispatch('alert/SHOW_ERROR_ALERT', 'Ocurrió un error, inténtelo de nuevo mas tarde.', { root: true });
                        console.error('Error with code-' + code + ": ", message);
                    }
                },
                error => {
                    dispatch('alert/SHOW_ERROR_ALERT', 'Ocurrió un error, inténtelo de nuevo mas tarde.', { root: true });
                    console.error('Exception Error:', error);
                }
            ).finally(() => {
                commit('diasFestivosController/mutateLoadingObtenerDatos', false, { root: true });
                loadingItem.movimiento = 1;
                dispatch('app/chargeLoadingsToShow', loadingItem, { root: true });
            });
    },

    guardarCalendario({ dispatch, commit }, itemRequest) {
        commit('diasFestivosController/mutateLoadingEnviarDatos', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        let loadingItem = {
            movimiento: 0,
            title: 'Guardando Calendario',
        }
        dispatch('app/chargeLoadingsToShow', loadingItem, { root: true });

        SERVICE.save(itemRequest)
            .then(
                response => {
                    const { code, message } = response;

                    if (code != 0) {
                        dispatch('alert/SHOW_SUCCESS_ALERT', 'Calendario guardado correctamente.', { root: true });
                        commit('diasFestivosController/mutateVerFormAgregarCalendario', false, { root: true })
                        dispatch('diasFestivosController/obtenerCalendarios', null, { root: true })
                    } else {
                        dispatch('alert/SHOW_ERROR_ALERT', 'Ocurrió un error, inténtelo de nuevo mas tarde.', { root: true });
                        console.error('Error with code-' + code + ": ", message);
                    }
                },
                error => {
                    dispatch('alert/SHOW_ERROR_ALERT', 'Ocurrió un error, inténtelo de nuevo mas tarde.', { root: true });
                    console.error('Exception Error:', error);
                }
            ).finally(() => {
                commit('diasFestivosController/mutateLoadingEnviarDatos', false, { root: true });
                loadingItem.movimiento = 1;
                dispatch('app/chargeLoadingsToShow', loadingItem, { root: true });
            });
    },

    eliminarCalendario({ dispatch, commit }, itemRequest) {
        commit('diasFestivosController/mutateLoadingEnviarDatos', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        let loadingItem = {
            movimiento: 0,
            title: 'Eliminando Calendario',
        }
        dispatch('app/chargeLoadingsToShow', loadingItem, { root: true });

        SERVICE.remove(itemRequest)
            .then(
                response => {
                    const { code, message } = response;

                    if (code != 0) {
                        dispatch('app/SOCKET_SEND', 'ELIMINAR_PLANTILLA', { root: true });
                        dispatch('alert/SHOW_SUCCESS_ALERT', 'Calendario eliminado correctamente.', { root: true });
                        dispatch('diasFestivosController/obtenerCalendarios', null, { root: true })
                    } else {
                        dispatch('alert/SHOW_ERROR_ALERT', 'Ocurrió un error, inténtelo de nuevo mas tarde.', { root: true });
                        console.error('Error with code-' + code + ": ", message);
                    }
                },
                error => {
                    dispatch('alert/SHOW_ERROR_ALERT', 'Ocurrió un error, inténtelo de nuevo mas tarde.', { root: true });
                    console.error('Exception Error:', error);
                }
            ).finally(() => {
                commit('diasFestivosController/mutateLoadingEnviarDatos', false, { root: true });
                loadingItem.movimiento = 1;
                dispatch('app/chargeLoadingsToShow', loadingItem, { root: true });
            });
    }
};

export const diasFestivosData = {
    namespaced: true,
    actions,
};