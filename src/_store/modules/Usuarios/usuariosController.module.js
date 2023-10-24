import Usuario from "@/models/Usuario";
import { getFechaActual } from "@/_helpers"

const state = {
    usuario: new Usuario(),
    listaUsuarios: [],
    loadingObtenerUsuarios: false,
    loadingGuardarUsuario: false,
    loadingEliminarUsuario: false,
    showFormAgregar: false,
}

const actions = {
    updateProps({ commit }, item) {
        commit("mutateProps", item);
    },
    toggleShowFormAgregar({ commit }, value) {
        commit("mutateShowFormAgregar", value);
        if (value && state.usuario.id === 0) {
            commit("mutateProps", { prop: "fechaRegistro", value: getFechaActual(true) });
        }
        if (!value) {
            commit("mutateLimpiar");
        }
    },
    obtenerListaUsuarios({ commit, dispatch }) {
        const itemRequest = {
            esActivoUno: 1,
            esActivoDos: 0
        };

        commit("mutateListaUsuarios", []);
        dispatch("usuariosData/showRecords", itemRequest, { root: true });
    },
    successObtenerListaUsuarios({ commit }, lista) {
        commit("mutateListaUsuarios", lista);
    },
    guardarUsuario({ dispatch }) {
        const itemRequest = state.usuario

        dispatch("usuariosData/saveRecord", itemRequest, { root: true });
    },
    successGuardarUsuario({ dispatch }) {
        dispatch("obtenerListaUsuarios");
        dispatch("toggleShowFormAgregar", false);
    },
    editarUsuario({ commit, dispatch }, item) {
        commit("mutateUsuario", item);
        dispatch("toggleShowFormAgregar", true);
    },
    eliminarUsuario({ dispatch }, item) {
        const itemRequest = {
            id: item.id
        };

        dispatch("usuariosData/deleteRecord", itemRequest, { root: true });
    },
    successEliminarUsuario({ dispatch }) {
        dispatch("obtenerListaUsuarios");
    },
}

const mutations = {
    mutateProps(state, { prop, value }) {
        state.usuario[prop] = value
    },
    mutateUsuario(state, item) {
        state.usuario = new Usuario(item)
    },
    mutateLimpiar(state) {
        state.usuario = new Usuario()
    },
    mutateShowFormAgregar(state, value) {
        state.showFormAgregar = value;
    },
    mutateListaUsuarios(state, lista) {
        state.listaUsuarios = lista
    },
    mutateLoadingObtenerUsuarios(state, value) {
        state.loadingObtenerUsuarios = value
    },
    mutateLoadingGuardarUsuario(state, value) {
        state.loadingGuardarUsuario = value
    },
    mutateLoadingEliminarUsuario(state, value) {
        state.loadingEliminarUsuario = value
    }
}

const getters = {
    getUsuariosAgentes() {
        return state.listaUsuarios.filter((usuario) => {
            return usuario.ccPerfil.clave === '03';
        })
    }
}

export const usuariosController = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}