import Vue from "vue";
import CardVerificarCorreo from './CardVerificarCorreo.vue'
import CardVerificarOTP from './CardVerificarOTP.vue'
import CardNuevaPassword from './CardNuevaPassword.vue'

const componentsList = [
    Vue.component("CardVerificarCorreo", CardVerificarCorreo),
    Vue.component("CardVerificarOTP", CardVerificarOTP),
    Vue.component("CardNuevaPassword", CardNuevaPassword),
]

export const recuperarPasswordComponents = {
    componentsList
}