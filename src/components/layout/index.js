import Vue from "vue";
import TheClock from "./TheClock.vue";
import TheFooter from "./TheFooter.vue";
import TheNavBar from "./TheNavBar.vue";
import TheNavigationDrawer from "./TheNavigationDrawer.vue";
import TheTitleBar from "./TheTitleBar.vue";
import TheCard from "./TheCard";

const componentsList = [
    Vue.component("TheClock", TheClock),
    Vue.component("TheFooter", TheFooter),
    Vue.component("TheNavBar", TheNavBar),
    Vue.component("TheNavigationDrawer", TheNavigationDrawer),
    Vue.component("TheTitleBar", TheTitleBar),
    Vue.component("TheCard", TheCard),
]

export const layoutComponents = {
    componentsList
}