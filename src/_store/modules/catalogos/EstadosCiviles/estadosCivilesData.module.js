
import { estadosCivilesService } from '@/_services';

const SERVICE = estadosCivilesService;

const actions = {
    showRecords({ dispatch, commit }, itemRequest) {
        let mensajeError = "Ocurrió un error al obtener los estados civiles,";
        commit('estadosCivilesController/mutateLoadingObtenerEstadosCiviles', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        SERVICE.showRecords(itemRequest)
            .then(
                response => {
                    if (response.code != 0) {
                        const { code, body, message } = response;

                        if (code > 0) {
                            if (body.length > 0) {
                                dispatch('estadosCivilesController/successObtenerListaEstadosCiviles', body, { root: true });
                            } else {
                                dispatch('app/showAppMessage', { type: "error", text: "No hay información que mostrar." }, { root: true });
                            }
                        } else {
                            dispatch('app/showAppMessage', { type: "error", text: message }, { root: true });
                        }
                    } else {
                        dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " verifique la información e inténtelo de nuevo.", { root: true });
                        console.error('Error with code-' + response.code + ": ", response.message);
                    }
                },
                error => {
                    dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " inténtelo de nuevo mas tarde.", { root: true });
                    console.error('Exception Error:', error);
                }
            ).finally(() => {
                commit('estadosCivilesController/mutateLoadingObtenerEstadosCiviles', false, { root: true });
            });
    },
    showRecordsSelect({ dispatch, commit }, itemRequest) {
        let mensajeError = "Ocurrió un error al obtener los estados civiles,";
        commit('estadosCivilesController/mutateLoadingObtenerEstadosCivilesSelect', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        SERVICE.showRecords(itemRequest)
            .then(
                response => {
                    if (response.code != 0) {
                        const { code, body, message } = response;

                        if (code > 0) {
                            if (body.length > 0) {
                                dispatch('estadosCivilesController/successObtenerListaEstadosCivilesSelect', body, { root: true });
                            } else {
                                dispatch('app/showAppMessage', { type: "error", text: "No hay información que mostrar." }, { root: true });
                            }
                        } else {
                            dispatch('app/showAppMessage', { type: "error", text: message }, { root: true });
                        }
                    } else {
                        dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " verifique la información e inténtelo de nuevo.", { root: true });
                        console.error('Error with code-' + response.code + ": ", response.message);
                    }
                },
                error => {
                    dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " inténtelo de nuevo mas tarde.", { root: true });
                    console.error('Exception Error:', error);
                }
            ).finally(() => {
                commit('estadosCivilesController/mutateLoadingObtenerEstadosCivilesSelect', false, { root: true });
            });
    },
    saveRecord({ dispatch, commit }, itemRequest) {
        let mensajeError = "Ocurrió un error al guardar el elemento,";
        commit('estadosCivilesController/mutateLoadingGuardarEstadoCivil', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        SERVICE.saveRecord(itemRequest)
            .then(
                response => {
                    if (response.code != 0) {
                        const { code, message } = response;

                        if (code > 0) {
                            dispatch('estadosCivilesController/successGuardarEstadoCivil', {}, { root: true });
                            dispatch('app/showAppMessage', { type: "success", text: "Guardado correctamente." }, { root: true });
                        } else {
                            dispatch('app/showAppMessage', { type: "error", text: message }, { root: true });
                        }
                    } else {
                        dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " verifique la información e inténtelo de nuevo.", { root: true });
                        console.error('Error with code-' + response.code + ": ", response.message);
                    }
                },
                error => {
                    dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " inténtelo de nuevo mas tarde.", { root: true });
                    console.error('Exception Error:', error);
                }
            ).finally(() => {
                commit('estadosCivilesController/mutateLoadingGuardarEstadoCivil', false, { root: true });
            });
    },
    deleteRecord({ dispatch, commit }, itemRequest) {
        let mensajeError = "Ocurrió un error al eliminar el elemento,";
        commit('estadosCivilesController/mutateLoadingEliminarEstadoCivil', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        SERVICE.deleteRecord(itemRequest)
            .then(
                response => {
                    if (response.code != 0) {
                        const { code, message } = response;

                        if (code > 0) {
                            dispatch('estadosCivilesController/successEliminarEstadoCivil', {}, { root: true });
                            dispatch('app/showAppMessage', { type: "success", text: "Eliminado correctamente." }, { root: true });
                        } else {
                            dispatch('app/showAppMessage', { type: "error", text: message }, { root: true });
                        }
                    } else {
                        dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " verifique la información e inténtelo de nuevo.", { root: true });
                        console.error('Error with code-' + response.code + ": ", response.message);
                    }
                },
                error => {
                    dispatch('alert/SHOW_ERROR_ALERT', mensajeError + " inténtelo de nuevo mas tarde.", { root: true });
                    console.error('Exception Error:', error);
                }
            ).finally(() => {
                commit('estadosCivilesController/mutateLoadingEliminarEstadoCivil', false, { root: true });
            });
    },
}

export const estadosCivilesData = {
    namespaced: true,
    actions,
}