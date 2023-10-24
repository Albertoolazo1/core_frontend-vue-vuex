import Vue from "vue";
import FormAgregarUsuario from './FormAgregarUsuario'
import TableUsuarios from './TableUsuarios'
import SelectAgentes from './SelectAgentes'

const componentsList = [
    Vue.component("FormAgregarUsuario", FormAgregarUsuario),
    Vue.component("TableUsuarios", TableUsuarios),
    Vue.component("SelectAgentes", SelectAgentes),
]

export const usuariosComponents = {
    componentsList
}