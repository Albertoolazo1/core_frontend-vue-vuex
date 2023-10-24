<template>
  <v-app-bar v-show="isLogged" color="custom_background" app elevate-on-scroll>
    <v-app-bar-nav-icon v-if="perfilUsuario.clave === '02'">
      <v-img height="50" contain src="@/assets/logo.png" alt="logo"></v-img>
    </v-app-bar-nav-icon>

    <the-clock v-show="false" />

    <v-spacer></v-spacer>

    <v-divider class="mx-2" vertical></v-divider>

    <v-menu bottom min-width="250px" rounded="xl" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-avatar color="primary elevation-3" size="45">
            <span class="white--text">{{ nameabrv }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar color="primary">
              <span class="white--text">{{ nameabrv }}</span>
            </v-avatar>
            <h5 class="mt-3 mb-3">{{ nombre }}</h5>
            <h6 class="mt-3 mb-3">{{ username }}</h6>
            <span class="text-caption text-capitalize">{{ perfil }}</span>
            <br />
            <br />
            <v-divider class="my-2" />
            <v-switch
              label="Modo oscuro"
              inset
              dense
              class="mt-4 mx-10"
              v-model="darkMode"
              color="green"
              @change="toggleDarkMode"
            >
            </v-switch>
            <v-divider class="my-2"></v-divider>
            <v-btn depressed rounded @click="cerrarSesion()">
              <v-icon small>mdi-power</v-icon>
              &nbsp;Cerrar sesión
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { appStorage, searchMenuItem } from "../../_helpers";

export default {
  created() {
    let isDarkModeOn = appStorage.getDarkMode();
    let storageUser = appStorage.getUser();
    let fromLogin = appStorage.getComeFromLogin();

    if (isDarkModeOn != undefined) {
      this.darkMode = isDarkModeOn ? true : false;
      this.$vuetify.theme.dark = this.darkMode;
    } else {
      this.darkMode = false;
    }

    if (storageUser != undefined && storageUser != "") {
      this.nombre = storageUser.nombre + " " + storageUser.apellidoPaterno;

      this.username = storageUser.username;
      this.nameabrv = storageUser.nombre[0] + storageUser.apellidoPaterno[0];
      this.perfil = storageUser.ccPerfil?.nombre ?? "ADMINISTRADOR";
    }

    if (fromLogin != undefined && fromLogin == "true") {
      appStorage.setComeFromLogin(false);
    }
  },

  data() {
    return {
      nombre: "",
      username: "",
      nameabrv: "",
      perfil: "",
      darkMode: false,
      notificacionesNuevas: false,
      notificaciones: [],
      mes: String(new Date().getMonth() + 1),
      anio: String(new Date().getFullYear()),

      timerTiempo: null,
      contadorLlamada: "",

      loadingColgarLlamada: false,
      activeNavigationDrawer: false,
    };
  },

  methods: {
    ...mapActions({
      toggleNavigationStatus: "app/toggleNavigationStatus",
    }),

    toggleNavigation() {
      const newValNavigationDrawerStatus = this.navigationDrawerStatus
        ? false
        : true;
      this.toggleNavigationStatus(newValNavigationDrawerStatus);
    },

    toggleDarkMode() {
      this.$vuetify.theme.dark = this.darkMode;
      appStorage.setDarkMode(this.darkMode);
    },

    cerrarSesion() {
      let storageUser = appStorage.getUser();

      if (storageUser != undefined && storageUser != "") {
        this.nombre = storageUser.nombre + " " + storageUser.apellidoPaterno;

        this.username = storageUser.username;
        this.nameabrv = storageUser.nombre[0] + storageUser.apellidoPaterno[0];
        this.perfil = storageUser.ccPerfil?.nombre ?? "ADMINISTRADOR";
      }

      this.$router.push({ path: "/login" });
    },
  },

  computed: {
    ...mapState({
      loginController: "loginController",
      app: "app",
    }),
    ...mapGetters({
      isLogged: "loginController/getStatusLogin",
    }),
    navigationDrawerStatus() {
      return this.app.navigationDrawerStatus;
    },

    perfilUsuario() {
      return this.loginController.perfilUsuario;
    },
    currentRouteName() {
      const menuItem = searchMenuItem(this.$route.name);
      return menuItem.name;
    },
  },

  watch: {
    isLogged(newVal) {
      if (newVal) {
        const storageUser = appStorage.getUser();

        if (storageUser != undefined && storageUser != "") {
          this.nombre = storageUser.nombre + " " + storageUser.apellidoPaterno;

          this.username = storageUser.username;
          this.nameabrv =
            storageUser.nombre[0] + storageUser.apellidoPaterno[0];
          this.perfil = storageUser.ccPerfil?.nombre ?? "ADMINISTRADOR";
        }
      }
    },
  },
};
</script>

<style>
.notification-color {
  background-color: rgba(254, 227, 228, 0.7);
}

.rowLlamadaActiva {
  position: absolute;
  width: 102%;
}

.animacionLlamadaActiva {
  animation-name: blinkerLlamada;
  animation-duration: 0.5s;
  animation-timing-function: 6;
  animation-iteration-count: infinite;
}
@keyframes blinkerLlamada {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>