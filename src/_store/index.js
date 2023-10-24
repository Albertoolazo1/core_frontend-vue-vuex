import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { app } from './app.module';

import { homeController } from './modules/Home/homeController.module';
//import { homeData } from './modules/Home/homeData.module';

import { loginController } from './modules/Login/loginController.module';
import { loginData } from './modules/Login/loginData.module';

import { estadosCivilesController } from './modules/catalogos/EstadosCiviles/estadosCivilesController.module'
import { estadosCivilesData } from './modules/catalogos/EstadosCiviles/estadosCivilesData.module'

import { usuariosData } from './modules/Usuarios/usuariosData.module'
import { usuariosController } from './modules/Usuarios/usuariosController.module'


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        app,
        alert,
        //account,
        loginController,
        loginData,

        // módulos
        homeController,

        // Catalogos
        estadosCivilesController,
        estadosCivilesData,

        usuariosData,
        usuariosController,
    }
});