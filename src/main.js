Vue.config.productionTip = false
Vue.config.silent = true
Vue.config.devtools = true

import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { store } from './_store';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./sass/index.scss";

Vue.use(Toast, {
  closeButtonClassName: "my-toast-button-class",
  progressBarClassName: "my-toast-progress-class",
  bodyClassName: "my-toast-body-class",
  toastClassName: "my-toast-class",
  transition: "Vue-Toastification__fade",
  maxToasts: 5,
  newestOnTop: true,
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
