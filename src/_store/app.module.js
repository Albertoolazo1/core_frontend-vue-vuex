import { appStorage } from "../_helpers";
import { connectSocket, sendMessageSocket, disconnectSocket } from "../_helpers/";

const state = {
    navigationDrawerStatus: false,
    tickMessage: '',
    tickCode: 0,
    path: '',
    opcionActivaMenu: '',

    loadingGetOTP: false,
    getOTPResponse: {},

    loadingValidateOTP: false,
    validateOTPResponse: {},

    loadingChangePass: false,
    changePassResponse: {},

    appMessage: {},
    appLogs: [],
    appConfirm: {},

    menuType: '',
    appTime: '',
};

const actions = {
    SOCKET_CONNECT({ commit, dispatch }) {
        connectSocket({
            commit,
            dispatch
        });
    },
    SOCKET_SEND({ commit }, { destino, message }) {
        commit('vacio', 'peticion');
        let timestamp = new Date().getUTCMilliseconds();
        let messageBuild = { codigo: timestamp, mensaje: message, fecha: String(timestamp) };

        sendMessageSocket({
            destino,
            messageBuild
        })
    },
    SOCKET_DISCONNECT() {
        disconnectSocket();
    },

    toggleNavigationStatus({ commit }, estado) {
        commit('mutateNavigationStatus', estado);
    },

    updateOpcionActivaMenu({ commit }, menu) {
        commit('mutateOpcionActivaMenu', menu);
    },


    // app message
    showAppMessage({ commit }, message) {
        commit('setAppMessage', message);
    },

    changeMenuType({ commit }, type) {
        commit('mutateMenuType', type);
    },

    // app logs
    showAppLogs({ commit }, message) {
        commit('setAppLogs', message);
    },

    changeAppTime({ commit }, timeValue) {
        commit('mutateAppTime', timeValue);
    },

    showConfirmNuevoRegistro({ commit }, message) {
        commit('setAppConfirm', message);
    }
};

const mutations = {
    vacio(valor) {
        appStorage.setTickWait(valor);
    },
    newTick(state, message) {
        state.tickCode = new Date().getUTCMilliseconds();
        state.tickMessage = message;
    },
    mutateNavigationStatus(state, estado) {
        state.navigationDrawerStatus = estado;
    },
    mutateOpcionActivaMenu(state, v) {
        state.opcionActivaMenu = v;
    },

    setAppMessage(state, message) {
        state.appMessage = message;
    },
    setAppLogs(state, logs) {
        state.appLogs = [];
        state.appLogs = logs;
    },

    mutateMenuType(state, type) {
        state.menuType = type;
    },

    mutateAppTime(state, type) {
        state.appTime = type;
    },

    setAppConfirm(state, message) {
        state.appConfirm = message;
    },
};

const getters = {
    getTick() {
        return state.tickCode;
    },
    getReloadNotificaciones() {
        return state.reloadNotificaciones;
    },

    getAppMessage() {
        return state.appMessage;
    },
    getAppLogs() {
        return state.appLogs;
    },
    getMenuType() {
        return state.menuType;
    },

    getAppConfirm() {
        return state.appConfirm;
    },
}

export const app = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};