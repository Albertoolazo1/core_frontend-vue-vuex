import { accountService } from '@/_services';
import { appStorage } from '@/_helpers';
import { getFechaActual } from '@/_helpers';
const _SERVICE = accountService;

const actions = {
    login({ dispatch, commit }, { username, password }) {
        /**
         * TODO: Remover comentario cuando este el socket
         * dispatch('app/SOCKET_CONNECT', '', { root: true });
         * */
        commit('loginController/mutateLoadingLogin', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        /*_SERVICE.login(username, password)
            .then(
                (response) => {
                    const { user, token } = response;

                    appStorage.setUser(user);
                    appStorage.setToken(token);
                    appStorage.setLoginDate(getFechaActual(true));
                    dispatch('loginController/loginSuccess', { user, token }, { root: true });
                },
                error => {
                    console.error(error);
                    if (error === "El usuario o la contraseña son incorrectos.") {
                        dispatch('alert/SHOW_ERROR_ALERT', error, { root: true });
                    } else {
                        dispatch('alert/SHOW_ERROR_ALERT', "Ocurrió un error, inténtelo de nuevo.", { root: true });
                    }
                }
            ).finally(() => {
                commit('loginController/mutateLoadingLogin', false, { root: true });
            });*/

        console.log(username, password);

        let user = {
            fechaRegistro: "2023-10-23",
            nombre: "NOMBRE",
            apellidoPaterno: "APEPAT",
            apellidoMaterno: "APEMAT",
            username: "PRUEBA@MAIL.COM",
            password: null,
            esActivo: 1,
            fechaSolicitud: "2023-10-23 23:23:23.0",
            codigoVerificacion: "621144",
            fechaActualizacion: null,
            correoElectronico: "PRUEBA@MAIL.COM",
            ccPerfilId: 2,
            origen: null,
            ccPerfil: {
                fechaRegistro: "2023-10-23 23:23:23.0",
                clave: "01",
                nombre: "ADMINISTRADOR",
                esActivo: 1,
                perfilAuthorizationList: [],
                usuariosAsignados: 0,
                id: 2
            },
            enabled: true,
            authorities: null,
            accountNonExpired: true,
            credentialsNonExpired: true,
            accountNonLocked: true,
            id: 3
        };
        let token = "sadaJGDFAJGDFAJDFASGHDFASGHAS654AS6574A6S7A6SD7A###ASDADHAGSH$$$";

        appStorage.setUser(user);
        appStorage.setToken(token);
        appStorage.setLoginDate(getFechaActual(true));
        dispatch('loginController/loginSuccess', { user, token }, { root: true });
        commit('loginController/mutateLoadingLogin', false, { root: true });
    },
    logout({ commit, dispatch }) {
        _SERVICE.logout();
        commit('logout');
        dispatch('app/SOCKET_DISCONNECT', '', { root: true });
    },
    signup({ dispatch, commit }, itemRequest) {
        commit('loginController/mutateLoadingSignup', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        _SERVICE.signup(itemRequest)
            .then(
                (response) => {
                    const { code, message } = response;

                    if (code > 0) {
                        dispatch('loginController/signupSuccess', null, { root: true });
                    } else {
                        dispatch('alert/SHOW_ERROR_ALERT', message, { root: true });
                    }
                },
                error => {
                    console.error(error);
                    dispatch('alert/SHOW_ERROR_ALERT', "Ocurrió un error, inténtelo de nuevo.", { root: true });
                }
            ).finally(() => {
                commit('loginController/mutateLoadingSignup', false, { root: true });
            });
    },

    getCodigoVerificacion({ dispatch, commit }, itemRequest) {
        commit('loginController/mutateLoadingObtenerCodigo', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        _SERVICE.getCodigoVerificacion(itemRequest)
            .then(
                (response) => {
                    const { code, message } = response;

                    if (code > 0) {
                        dispatch('loginController/obtenerCodigoSuccess', response, { root: true });
                        dispatch('app/showAppMessage', { type: "success", text: message }, { root: true });
                    } else {
                        dispatch('app/showAppMessage', { type: "error", text: message }, { root: true });
                    }
                },
                error => {
                    console.error(error);
                    dispatch('alert/SHOW_ERROR_ALERT', "Ocurrió un error, inténtelo de nuevo.", { root: true });
                }
            ).finally(() => {
                commit('loginController/mutateLoadingObtenerCodigo', false, { root: true });
            });
    },
    validateCodigoVerificacion({ dispatch, commit }, itemRequest) {
        commit('loginController/mutateLoadingValidarCodigo', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        _SERVICE.validateCodigoVerificacion(itemRequest)
            .then(
                (response) => {
                    const { code, message } = response;

                    if (code > 0) {
                        dispatch('loginController/validarCodigoSuccess', response, { root: true });
                        dispatch('app/showAppMessage', { type: "success", text: "Código válido" }, { root: true });
                    } else {
                        dispatch('app/showAppMessage', { type: "error", text: message }, { root: true });
                    }
                },
                error => {
                    console.error(error);
                    dispatch('alert/SHOW_ERROR_ALERT', "Ocurrió un error, inténtelo de nuevo.", { root: true });
                }
            ).finally(() => {
                commit('loginController/mutateLoadingValidarCodigo', false, { root: true });
            });
    },
    changePassword({ dispatch, commit }, itemRequest) {
        commit('loginController/mutateLoadingCambiarPassword', true, { root: true });
        dispatch('alert/CLEAR_ALERT', '', { root: true });

        _SERVICE.changePassword(itemRequest)
            .then(
                (response) => {
                    const { code, message } = response;

                    if (code > 0) {
                        dispatch('loginController/cambiarPasswordSuccess', response, { root: true });
                        dispatch('app/showAppMessage', { type: "success", text: message }, { root: true });
                    } else {
                        dispatch('app/showAppMessage', { type: "error", text: message }, { root: true });
                    }
                },
                error => {
                    console.error(error);
                    dispatch('alert/SHOW_ERROR_ALERT', "Ocurrió un error, inténtelo de nuevo.", { root: true });
                }
            ).finally(() => {
                commit('loginController/mutateLoadingCambiarPassword', false, { root: true });
            });
    },
};

export const loginData = {
    namespaced: true,
    actions
}