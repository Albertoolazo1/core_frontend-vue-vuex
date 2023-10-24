import Vue from "vue";
import CardFormLogin from './CardFormLogin'
import CardFormSignIn from './CardFormSignIn'
import CardLogin from './CardLogin'

const componentsList = [
    Vue.component("CardFormLogin", CardFormLogin),
    Vue.component("CardFormSignIn", CardFormSignIn),
    Vue.component("CardLogin", CardLogin),
]

export const loginComponents = {
    componentsList
}