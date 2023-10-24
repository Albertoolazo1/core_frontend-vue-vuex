import Vue from "vue";

import FormAgregarEstadoCivil from "./EstadosCiviles/FormAgregarEstadoCivil"
import TableEstadosCiviles from "./EstadosCiviles/TableEstadosCiviles"

const componentsList = [
    Vue.component("FormAgregarEstadoCivil", FormAgregarEstadoCivil),
    Vue.component("TableEstadosCiviles", TableEstadosCiviles),
]

export const catalogosComponents = {
    componentsList,
}