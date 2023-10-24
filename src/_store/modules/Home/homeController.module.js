const state = {
    contador: 0,
}

const actions = {
    sumarUnoContador({ commit }) {
        let auxContador = state.contador;

        auxContador = auxContador + 1;

        commit("mutateContador", auxContador);
    },
}

const mutations = {
    mutateContador(state, value) {
        state.contador = value
    },
}

const getters = {
    tresVecesContador() {
        return state.contador * 3
    }
}

export const homeController = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}