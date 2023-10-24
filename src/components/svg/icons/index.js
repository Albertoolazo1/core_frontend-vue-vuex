import Vue from "vue";
import IconIntroduccion from './IconIntroduccion'
import IconPatrimonio from './IconPatrimonio'
import IconNumeroMagico from './IconNumeroMagico'
import IconJubilacion from './IconJubilacion'
import IconOtrosSuenos from './IconOtrosSuenos'
import IconAhorros from './IconAhorros'
import IconRiesgos from './IconRiesgos'
import IconReglaOro from './IconReglaOro'

const componentsList = [
    Vue.component("IconIntroduccion", IconIntroduccion),
    Vue.component("IconPatrimonio", IconPatrimonio),
    Vue.component("IconNumeroMagico", IconNumeroMagico),
    Vue.component("IconJubilacion", IconJubilacion),
    Vue.component("IconOtrosSuenos", IconOtrosSuenos),
    Vue.component("IconAhorros", IconAhorros),
    Vue.component("IconRiesgos", IconRiesgos),
    Vue.component("IconReglaOro", IconReglaOro),
]

export const iconsComponents = {
    componentsList
}