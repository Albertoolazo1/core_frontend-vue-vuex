import Vue from 'vue';
import { VTextField, VTextarea, VCard, VSwitch, VSelect } from 'vuetify/lib';

const wrappersList = [
    Vue.component('WCard', {
        extends: VCard,
        props: {
            elevation: {
                type: [Number, String],
                default: 0
            },
            rounded: {
                type: String,
                default: "xl"
            },
        }
    }),
    Vue.component('WTextField', {
        extends: VTextField,
        props: {
            outlined: {
                type: Boolean,
                default: true
            },
            dense: {
                type: Boolean,
                default: true,
            },
        }
    }),
    Vue.component('WSelect', {
        extends: VSelect,
        props: {
            outlined: {
                type: Boolean,
                default: true
            },
            dense: {
                type: Boolean,
                default: true,
            },
        },
    }),
    Vue.component('WTextarea', {
        extends: VTextarea,
        props: {
            outlined: {
                type: Boolean,
                default: true
            },
            dense: {
                type: Boolean,
                default: true,
            },
        }
    }),
    Vue.component('WSwitch', {
        extends: VSwitch,
        props: {
            inset: {
                type: Boolean,
                default: true
            },
            dense: {
                type: Boolean,
                default: true,
            },
        }
    }),
]

export const wrapperComponents = {
    wrappersList
}