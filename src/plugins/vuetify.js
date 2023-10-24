import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { config } from '../_config'
import es from 'vuetify/lib/locale/es'
import { layoutComponents } from '../components/layout/index'
import { commonComponents } from '../components/common/index'
import { wrapperComponents } from '../components/wrappers/index'
import { modulesComponents } from '../components/modules/index'
import { svgComponents } from '../components/svg';

Vue.use(Vuetify);

// plugins componentes
Vue.use(layoutComponents);
Vue.use(commonComponents);
Vue.use(wrapperComponents);
Vue.use(modulesComponents);
Vue.use(svgComponents);

export default new Vuetify({
    lang: {
        locales: { es },
        current: 'es',
    },

    customVariables: ['~/sass/variables.scss'],

    treeShake: true,

    theme: {
        options: {
            customProperties: true,
        },
        dark: false,
        themes: {
            dark: {
                primary: config.DARK.PRIMARY_COLOR,
                secondary: config.DARK.SECONDARY_COLOR,
                accent: config.DARK.ACCENT_COLOR,
                error: config.DARK.ERROR_COLOR,
                info: config.INFO_COLOR,
                background: config.DARK.BACKGROUND_COLOR,
                customBackground: config.DARK.CUSTOM_BACKGROUND_COLOR,
            },
            light: {
                primary: config.LIGHT.PRIMARY_COLOR,
                secondary: config.LIGHT.SECONDARY_COLOR,
                accent: config.LIGHT.ACCENT_COLOR,
                error: config.LIGHT.ERROR_COLOR,
                info: config.INFO_COLOR,
                background: config.LIGHT.BACKGROUND_COLOR,
                customBackground: config.LIGHT.CUSTOM_BACKGROUND_COLOR,
            }
        }
    }
});
