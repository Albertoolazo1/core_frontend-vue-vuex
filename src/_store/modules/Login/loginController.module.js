import { appStorage, getFechaActual } from "@/_helpers";
import CryptoJS from 'crypto-js';
import router from '@/router';

const _USER = appStorage.getUser();
const _PERFIL = appStorage.getUser() ? appStorage.getUser().ccPerfil : {};

const state = {
    loginRequest: {
        username: "",
        password: ""
    },
    signupRequest: {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        username: "",
        correoElectronico: "",
        password: "",
        origen: "PUBLICO",
    },
    recuperarPasswordRequest: {
        username: "",
        codigoVerificacion: "",
        password: ""
    },
    correoValido: false,
    loadingObtenerCodigo: false,
    loadingValidarCodigo: false,
    loadingCambiarPassword: false,
    loadingSignup: false,
    user: _USER ? { status: { loggedIn: true }, user: _USER, statusRequest: false } : { status: { loggedIn: false }, user: null, statusRequest: false },
    token: "",
    loadingLogin: false,
    passphrase: process.env.VUE_APP_PASSPHRASE,
    perfilUsuario: _PERFIL ? _PERFIL : {},

    stepLogin: 0,
    destinoAvisoPrivacidad: 0,
    fromRegistro: false,
}

const actions = {
    actualizarProps({ commit }, { propiedad, valor }) {
        commit('mutateProps', { propiedad, valor });
    },
    login({ dispatch }) {
        const cryptPass = CryptoJS.AES.encrypt(
            state.loginRequest.password,
            state.passphrase
        ).toString();

        const loginRequest = {
            username: state.loginRequest.username,
            password: cryptPass,
        };
        dispatch("loginData/login", loginRequest, { root: true });
    },
    loginSuccess({ commit, dispatch }, responseLogin) {
        const userItem = { status: { loggedIn: true }, user: responseLogin.user, statusRequest: false };

        const usuario = responseLogin.user;
        const perfilUsuario = usuario.ccPerfil;

        commit("mutatePerfilUsuario", perfilUsuario);
        commit("mutateUser", userItem);
        commit("mutateToken", responseLogin.token);

        dispatch("resetLogin");
        commit("mutateFromRegistro", false);

        router.push('/home');
    },
    logout({ commit, dispatch }) {
        appStorage.logout();
        commit("logout");
        commit("mutatePerfilUsuario", {})
        dispatch('app/SOCKET_DISCONNECT', '', { root: true });
    },

    actualizarPropsSignup({ commit }, { propiedad, valor }) {
        commit("mutatePropsSignup", { propiedad, valor });
    },
    // Este método solo funciona para el registro de usuario nuevo desde la vista "Registrarme",
    // por eso se coloca origen como PUBLICO enduro
    signUp({ dispatch }) {
        const cryptPass = CryptoJS.AES.encrypt(
            state.signupRequest.password,
            state.passphrase
        ).toString();

        const signupRequest = {
            fechaRegistro: getFechaActual(true),
            nombre: state.signupRequest.nombre,
            apellidoPaterno: state.signupRequest.apellidoPaterno,
            apellidoMaterno: state.signupRequest.apellidoMaterno,
            correoElectronico: state.signupRequest.correoElectronico,
            username: state.signupRequest.username,
            origen: "PUBLICO",
            password: cryptPass,
            esActivo: 1,
        };

        dispatch("loginData/signup", signupRequest, { root: true })
    },
    signupSuccess({ dispatch, commit }) {
        commit("mutateLoginRequest", {
            username: state.signupRequest.username,
            password: state.signupRequest.password,
        });

        dispatch("login");
        commit("mutateFromRegistro", true);
    },

    updateLoginStep({ commit }, { step, destino }) {
        commit("mutateStepLogin", step)
        commit("mutateDestinoAvisoPrivacidad", destino)
    },
    resetLogin({ commit }) {
        commit("mutateLoginRequest", {
            username: "",
            password: ""
        });
        commit("mutateSignupRequest", {
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            correoElectronico: "",
            username: "",
            password: "",
        });

        commit("mutateStepLogin", 0)
        commit("mutateDestinoAvisoPrivacidad", 0)
    },

    // recuperación de contraseña
    actualizarPropsRecuperarPassword({ commit }, { propiedad, valor }) {
        commit("mutatePropsRecuperarPasswordRequest", { propiedad, valor });
    },

    obtenerCodigo({ dispatch }) {
        const request = {
            username: state.recuperarPasswordRequest.username,
            fechaSolicitud: getFechaActual(true),
        }

        dispatch("loginData/getCodigoVerificacion", request, { root: true })
    },
    obtenerCodigoSuccess({ commit },) {
        commit("mutateStepLogin", 5)
    },
    validarCodigo({ dispatch }) {
        const request = {
            username: state.recuperarPasswordRequest.username,
            codigoVerificacion: state.recuperarPasswordRequest.codigoVerificacion,
            fechaSolicitud: getFechaActual(true),
        }

        dispatch("loginData/validateCodigoVerificacion", request, { root: true })
    },
    validarCodigoSuccess({ commit }) {
        commit("mutateStepLogin", 6)
    },
    cambiarPassword({ dispatch }) {
        const cryptPass = CryptoJS.AES.encrypt(
            state.recuperarPasswordRequest.password,
            state.passphrase
        ).toString();

        const request = {
            username: state.recuperarPasswordRequest.username,
            codigoVerificacion: state.recuperarPasswordRequest.codigoVerificacion,
            password: cryptPass,
            fechaActualizacion: getFechaActual(true),
        }

        dispatch("loginData/changePassword", request, { root: true })
    },
    cambiarPasswordSuccess({ commit }) {
        commit("mutateRecuperarPasswordRequest", {
            username: "",
            codigoVerificacion: "",
            password: ""
        });

        commit("mutateStepLogin", 2);
    },
}

const mutations = {
    mutateLoginRequest(state, loginRequest) {
        state.loginRequest = loginRequest
    },
    mutateSignupRequest(state, signupRequest) {
        state.signupRequest = signupRequest
    },
    mutateRecuperarPasswordRequest(state, obtenerCodigoRequest) {
        state.recuperarPasswordRequest = obtenerCodigoRequest
    },

    mutateProps(state, { propiedad, valor }) {
        if (propiedad && propiedad != '' && valor && valor != '') {
            state.loginRequest[propiedad] = valor;
        }
    },
    mutatePropsSignup(state, { propiedad, valor }) {
        if (propiedad && propiedad != '' && valor && valor != '') {
            state.signupRequest[propiedad] = valor;
        }
    },
    mutateUser(state, user) {
        state.user = user
    },
    mutateToken(state, token) {
        state.token = token
    },
    logout(state) {
        state.user = { status: { loggedIn: false }, user: null, statusRequest: false };
        state.token = ''
    },
    mutateLoadingLogin(state, value) {
        state.loadingLogin = value;
    },
    mutateLoadingSignup(state, value) {
        state.loadingSignup = value;
    },

    mutateStepLogin(state, step) {
        state.stepLogin = step
    },
    mutateDestinoAvisoPrivacidad(state, destino) {
        state.destinoAvisoPrivacidad = destino
    },
    mutatePerfilUsuario(state, perfil) {
        state.perfilUsuario = perfil;
    },
    mutateFromRegistro(state, value) {
        state.fromRegistro = value;
    },

    mutatePropsRecuperarPasswordRequest(state, { propiedad, valor }) {
        if (propiedad && propiedad != '' && valor && valor != '') {
            state.recuperarPasswordRequest[propiedad] = valor;
        }
    },

    mutateLoadingObtenerCodigo(state, value) {
        state.loadingObtenerCodigo = value;
    },
    mutateLoadingValidarCodigo(state, value) {
        state.loadingValidarCodigo = value;
    },
    mutateLoadingCambiarPassword(state, value) {
        state.loadingCambiarPassword = value;
    },
}

const getters = {
    getLoginRequest() {
        return state.loginRequest
    },
    getUser() {
        return state.user
    },
    getToken() {
        return state.token
    },
    getStatusLogin() {
        return state.user?.status?.loggedIn
    },
    getLoadingLogin() {
        return state.loadingLogin
    },
}

export const loginController = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}