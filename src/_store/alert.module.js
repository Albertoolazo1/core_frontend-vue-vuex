const state = {
    enabled: false,
    type: null,
    title: 'Title',
    message: '',

    appMessage: {},
};

const actions = {
    SHOW_INFO_ALERT({ commit }, message) {
        commit('info', message);
    },
    SHOW_SUCCESS_ALERT({ commit }, message) {
        commit('success', message);
    },
    SHOW_ERROR_ALERT({ commit }, message) {
        commit('error', message);
    },
    SHOW_WARNING_ALERT({ commit }, message) {
        commit('warning', message);
    },
    CLEAR_ALERT({ commit }, message) {
        commit('clear', message);
    },

    showAppMessage({ commit }, message) {
        commit('setAppMessage', message);
    },
};

const mutations = {
    info(state, message) {
        state.enabled = true;
        state.type = 'info';
        state.title = 'Aviso:';
        state.message = message;
    },
    success(state, message) {
        state.enabled = true;
        state.type = 'success';
        state.title = 'Éxito:';
        state.message = message;
    },
    error(state, message) {
        state.enabled = true;
        state.type = 'error';
        state.title = 'Error:';
        state.message = message;
    },
    warning(state, message) {
        state.enabled = true;
        state.type = 'warning';
        state.title = 'Importante:';
        state.message = message;
    },
    clear(state, message) {
        state.enabled = false;
        state.type = null;
        state.title = null;
        state.message = message;
    },

    setAppMessage(state, message) {
        state.appMessage = message;
    }
};

const getters = {
    getEnabledStatus: function () {
        return state.enabled;
    },

    getAppMessage() {
        return state.appMessage;
    },
}

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};