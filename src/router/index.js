import Vue from 'vue'
import VueRouter from 'vue-router'
import { accountService } from '../_services'
import { appStorage, searchMenuItem, rutaAutorizada } from '../_helpers';
import { store } from '../_store';

Vue.use(VueRouter);

const routes = [
  { path: '*', redirect: '/home' },
  {
    path: '/login/:param1/:param2/:param3',
    name: 'loginParams',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },

  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('../views/Usuarios.vue')
  },

  {
    path: '/sinAutorizacion',
    name: 'noAutorizado',
    component: () => import('../views/Unauthorized.vue'),
    meta: {
      isPublic: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/login/:param1/:param2'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = appStorage.getUser();

  if (to.params.param1 && to.params.param1 != undefined && to.params.param2 && to.params.param2 != undefined) {
    console.log("parametros dinámicos", to.params)
  }

  if (to.name != 'noAutorizado' && to.path != '/login' && to.name != 'settings') {
    let menuItem = searchMenuItem(to.name);
    let rutaAuth = rutaAutorizada(menuItem);

    console.log(menuItem, rutaAuth);

    if (menuItem.id) {
      store.dispatch('app/updateOpcionActivaMenu', menuItem.path);
    }

    if (rutaAuth) {
      return next();
    } else {
      return next('/sinAutorizacion')
    }
  }

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if (to.name === 'login') {
    accountService.logout();
  }

  next();
})


export default router
