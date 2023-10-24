import EstadoCivil from "@/models/EstadoCivil";
import { getFechaActual } from "@/_helpers"

const state = {
    estadoCivil: new EstadoCivil(),
    listaEstadosCiviles: [],
    loadingObtenerEstadosCiviles: false,
    listaEstadosCivilesSelect: [],
    loadingObtenerEstadosCivilesSelect: false,
    loadingGuardarEstadoCivil: false,
    loadingEliminarEstadoCivil: false,
    showFormAgregar: false,
}

const actions = {
    updateProps({ commit }, item) {
        commit("mutateProps", item)
    },
    toggleShowFormAgregar({ commit }, value) {
        commit("mutateShowFormAgregar", value)
        if (value && state.estadoCivil.id === 0) {
            commit("mutateProps", { prop: "fechaRegistro", value: getFechaActual(true) })
        }
        if (!value) {
            commit("mutateLimpiar")
        }
    },
    obtenerListaEstadosCiviles({ commit, dispatch }) {
        const itemRequest = {
            esActivoUno: 1,
            esActivoDos: 0
        };

        commit("mutateListaEstadosCiviles", [])
        dispatch("estadosCivilesData/showRecords", itemRequest, { root: true })
    },
    successObtenerListaEstadosCiviles({ commit }, lista) {
        commit("mutateListaEstadosCiviles", lista)
    },
    obtenerListaEstadosCivilesSelect({ commit, dispatch }) {
        const itemRequest = {
            esActivoUno: 1,
            esActivoDos: 1
        };

        commit("mutateListaEstadosCivilesSelect", [])
        dispatch("estadosCivilesData/showRecordsSelect", itemRequest, { root: true })
    },
    successObtenerListaEstadosCivilesSelect({ commit }, lista) {
        commit("mutateListaEstadosCivilesSelect", lista)
    },
    guardarEstadoCivil({ dispatch }) {
        const itemRequest = state.estadoCivil

        dispatch("estadosCivilesData/saveRecord", itemRequest, { root: true })
    },
    successGuardarEstadoCivil({ dispatch }) {
        dispatch("obtenerListaEstadosCiviles")
        dispatch("toggleShowFormAgregar", false);
    },
    editarEstadoCivil({ commit, dispatch }, item) {
        commit("mutateEstadoCivil", item)
        dispatch("toggleShowFormAgregar", true)
    },
    eliminarEstadoCivil({ dispatch }, item) {
        const itemRequest = {
            id: item.id
        };

        dispatch("estadosCivilesData/deleteRecord", itemRequest, { root: true })
    },
    successEliminarEstadoCivil({ dispatch }) {
        dispatch("obtenerListaEstadosCiviles")
    },
}

const mutations = {
    mutateProps(state, { prop, value }) {
        state.estadoCivil[prop] = value
    },
    mutateEstadoCivil(state, item) {
        state.estadoCivil = new EstadoCivil(item)
    },
    mutateLimpiar(state) {
        state.estadoCivil = new EstadoCivil()
    },
    mutateShowFormAgregar(state, value) {
        state.showFormAgregar = value;
    },
    mutateListaEstadosCiviles(state, lista) {
        state.listaEstadosCiviles = lista
    },
    mutateListaEstadosCivilesSelect(state, lista) {
        state.listaEstadosCivilesSelect = lista
    },
    mutateLoadingObtenerEstadosCivilesSelect(state, value) {
        state.loadingObtenerEstadosCivilesSelect = value
    },
    mutateLoadingObtenerEstadosCiviles(state, value) {
        state.loadingObtenerEstadosCiviles = value
    },
    mutateLoadingGuardarEstadoCivil(state, value) {
        state.loadingGuardarEstadoCivil = value
    },
    mutateLoadingEliminarEstadoCivil(state, value) {
        state.loadingEliminarEstadoCivil = value
    }
}

const getters = {
    getNumeroMagico() {
        return state.numeroMagico
    }
}

export const estadosCivilesController = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}