<template>
  <v-app>
    <the-nav-bar v-show="pathValid" />

    <the-navigation-drawer v-if="pathValid && perfilValido" />

    <v-main class="px-xs-0 px-md-0">
      <transition
        name="router-anim"
        enter-active-class="router-anim-enter-active"
        leave-active-class="router-anim-leave-active"
      >
        <router-view v-if="conexion == 1" />

        <offline v-else />
      </transition>
    </v-main>

    <v-tooltip v-if="false" top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          v-scroll="onScroll"
          v-show="fab"
          fab
          dark
          fixed
          bottom
          right
          color="secondary"
          @click="toTop"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </template>
      <span>Ir arriba</span>
    </v-tooltip>

    <c-snack-bar
      :show="snackBarShow"
      :text="snackBarText"
      :timer="snackBarTimer"
      :type="snackBarType"
      @setShowSnackBar="setShowSnackBar($event)"
    />

    <c-dialog-confirm
      :show="showDialog"
      :text="dialogTitle"
      :description="dialogDescription"
      @confirm="confirmarEliminar()"
      @cancel="cancelarEliminar()"
      @setShowDialog="setShowDialog($event)"
    />

    <the-footer />
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { appStorage } from "./_helpers";
import Alert from "./components/common/Alert.vue";
import Offline from "./views/Offline.vue";

export default {
  name: "QAsistenciaApp",

  components: {
    Offline,
  },

  created() {
    window.addEventListener("beforeunload", this.beforeWindowUnload);
    window.addEventListener("resize", this.onResize);

    let actualPath = window.location.pathname;
    this.pathValid = !actualPath.includes("/login") ? true : false;
    this.isLogin = actualPath.includes("/login");

    this.onResize();

    /*if (window.innerHeight > window.innerWidth) {
      alert("Por favor coloque su telefono en modo horizontal."); // validacion en móvil landscape completar
    }*/
  },
  mounted() {
    const userLocal = appStorage.getUser();

    if (userLocal) {
      const perfilUserLocal = userLocal.ccPerfil;

      if (userLocal != undefined && userLocal != "") {
        this.SOCKET_CONNECT();

        if (perfilUserLocal.clave === "02") {
          this.obtenerSesionCliente({ id: userLocal.id, fromLogin: false });
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.beforeWindowUnload);
  },
  destroyed() {
    this.SOCKET_DISCONNECT();
  },

  data() {
    return {
      pathValid: false,

      isLogin: false,
      display: 3,

      snackBarShow: false,
      snackBarText: "",
      snackBarTimer: "5000",
      snackBarType: "info",

      showLogs: false,
      logs: [],
      conexion: 1,

      fab: false,

      activeNavigationDrawer: false,

      showDialog: false,
      dialogTitle: "",
      dialogDescription: "",
      onConfirmarCallBack: () => {},
    };
  },

  computed: {
    ...mapState({
      alertState: (state) => state.alert,

      tickState: (state) => state.app.tickState,
      appTime: (state) => state.app.appTime,
      appMessage: (state) => state.app.appMessage,

      perfilUsuario: (state) => state.loginController.perfilUsuario,
    }),
    ...mapGetters({
      alertEnabled: "alert/getEnabledStatus",
      isLogged: "loginController/getStatusLogin",
      tickSocket: "app/getTick",
      actualPath: "app/getPath",
      getAppLogs: "app/getAppLogs",
      getAppConfirm: "app/getAppConfirm",
    }),

    perfilValido() {
      return this.perfilEsUsuario();
    },
  },

  methods: {
    ...mapActions("app", [
      "SOCKET_CONNECT",
      "SOCKET_DISCONNECT",
      "SOCKET_SEND",
    ]),

    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },

    showSystemAlert: function (config) {
      let type = config.type;
      let message = config.message;
      let title = config.title;
      let icon = "mdi-alert-circle";

      const content = {
        component: Alert,
        props: {
          title: title,
          body: message,
        },
      };

      switch (type) {
        case "error":
          icon = "mdi mdi-alert-outline";
          break;

        case "success":
          icon = "mdi mdi-check-circle-outline";
          break;

        case "info":
          icon = "mdi mdi-information-outline";
          break;

        case "warning":
          icon = "mdi mdi-alert-outline";
          break;
      }

      this.$toast[type](content, {
        position: "bottom-right",
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: false,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: icon,
        rtl: false,
      });
    },

    onResize() {
      if (window.innerWidth > 960) {
        this.display = 5;
      } else {
        this.display = 3;
      }
    },

    // Muestra una snackbar basado en el store
    setShowSnackBar(val) {
      this.snackBarShow = val;
    },
    showSnackBar({ text: text, type: type }) {
      let timer = "6000";
      this.setShowSnackBar(false);

      switch (type) {
        case "success":
          timer = "3000";
          break;
        case "info":
          timer = "3000";
          break;
        case "warning":
          timer = "3000";
          break;
        case "error":
          timer = "3500";
          break;
      }

      this.snackBarText = text;
      this.snackBarType = type;
      this.snackBarTimer = timer;
      this.setShowSnackBar(true);
    },
    showHistorico(historico) {
      this.showLogs = true;
      this.logs = historico;
    },
    agregarRuta(rutaName) {
      const rutaEncontrada = this.listaRutas.filter((route) => {
        if (route.name === rutaName) {
          return route;
        }
      });
      if (this.arrayRutasVisitadas.length > 0) {
        const rutaExiste = this.arrayRutasVisitadas.filter((ruta) => {
          return ruta === rutaName;
        });

        if (rutaEncontrada && !rutaExiste) {
          this.arrayRutasVisitadas.push(rutaName);
        }
      } else {
        this.arrayRutasVisitadas.push(rutaName);
      }
    },

    showDialogConfirm({ title: title, text: text, callback: callback }) {
      this.showDialog = true;
      this.dialogTitle = title;
      this.dialogDescription = text;
      this.onConfirmarCallBack = callback;
    },
    confirmarEliminar() {
      this.onConfirmarCallBack();
      this.setShowDialog(false);
    },
    setShowDialog(v) {
      this.showDialog = v;
    },
    cancelarEliminar() {
      this.setShowDialog(false);
    },

    perfilEsUsuario() {
      const clave = this.perfilUsuario?.clave ?? "02";
      return clave != "02";
    },
  },

  watch: {
    alertEnabled() {
      if (this.alertState.enabled) {
        let sysMessage = this.alertState;
        this.showSystemAlert(sysMessage);
      }
    },

    tickSocket() {
      let sysMessage = {
        type: "warning",
        message:
          "Un usuario modificó la información de " + this.tickState.tickMessage,
        title: "Cambio en información.",
      };
      let espera = appStorage.getTickWait();
      if (espera == null || espera == "") {
        this.showSystemAlert(sysMessage);
      }
      appStorage.setTickWait("");
    },

    isLogged(value) {
      if (value) {
        this.SOCKET_CONNECT();
      } else {
        this.SOCKET_DISCONNECT();
      }
    },

    $route(to) {
      this.isLogin = to.path.includes("/login");

      this.pathValid =
        !to.path?.includes("/login") && !to.path?.includes("/enviarUbicacion")
          ? true
          : false;

      //this.agregarRuta(to.name);
    },

    appMessage(newMessage) {
      this.showSnackBar(newMessage);
    },

    getAppConfirm(newMessageConfirm) {
      this.showDialogConfirm(newMessageConfirm);
    },

    getAppLogs(newHistorico) {
      if (newHistorico.length > 0) {
        this.showHistorico(newHistorico);
      }
    },

    appTime: {
      handler() {
        if (!navigator.onLine) {
          this.snackTimer = "-1";
          this.snackText = "No hay conexión a internet.";
          this.snackBtnText = "OK";
          this.snackBtnColor = "error";
          this.snackRedirect = {};
          this.snackShow = true;

          this.conexion = 0;
        } else if (this.conexion == 0) {
          this.snackTimer = "2000";
          this.snackText = "Conexión restablecida";
          this.snackBtnText = "OK";
          this.snackBtnColor = "success";
          this.snackRedirect = {};
          this.snackShow = true;

          this.conexion = 1;
        }
      },
      immediate: true,
    },

    perfilUsuario: {
      handler(newValPerfil) {
        if (newValPerfil.clave === "02") {
          this.obtenerPlanificacionByUsuarioId();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>
