
import { accountService } from '@/_services';

const SERVICE = accountService;

const actions = {
    showRecords({ dispatch, commit }, itemRequest) {
        let mensajeError = "Ocurrió un error al obtener los usuarios,";
        commit('usuariosController/mutateLoadingObtenerUsuarios', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        SERVICE.showRecords(itemRequest)
            .then(
                response => {
                    if (response.code != 0) {
                        const { code, body, message } = response;

                        if (code > 0) {
                            if (body.length > 0) {
                                dispatch('usuariosController/successObtenerListaUsuarios', body, { root: true });
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
                commit('usuariosController/mutateLoadingObtenerUsuarios', false, { root: true });
            });
    },
    saveRecord({ dispatch, commit }, itemRequest) {
        let mensajeError = "Ocurrió un error al guardar el elemento,";
        commit('usuariosController/mutateLoadingGuardarUsuario', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        SERVICE.saveRecord(itemRequest)
            .then(
                response => {
                    if (response.code != 0) {
                        const { code, message } = response;

                        if (code > 0) {
                            dispatch('usuariosController/successGuardarUsuario', {}, { root: true });
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
                commit('usuariosController/mutateLoadingGuardarUsuario', false, { root: true });
            });
    },
    deleteRecord({ dispatch, commit }, itemRequest) {
        let mensajeError = "Ocurrió un error al eliminar el elemento,";
        commit('usuariosController/mutateLoadingEliminarUsuario', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        SERVICE.deleteRecord(itemRequest)
            .then(
                response => {
                    if (response.code != 0) {
                        const { code, message } = response;

                        if (code > 0) {
                            dispatch('usuariosController/successEliminarUsuario', {}, { root: true });
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
                commit('usuariosController/mutateLoadingEliminarUsuario', false, { root: true });
            });
    },
}

export const usuariosData = {
    namespaced: true,
    actions,
}