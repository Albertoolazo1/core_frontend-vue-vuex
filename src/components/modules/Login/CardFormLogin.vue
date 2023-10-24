<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="4" offset-md="1">
      <w-card elevation="0">
        <v-img class="mb-7" src="@/assets/logo.png" height="10vh" contain>
        </v-img>

        <v-card-title>
          <h2 class="mb-7 font-weight-bold" style="white-space: nowrap">
            Inicio de Sesión
          </h2>
        </v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="handleLogin"
          >
            <v-row dense>
              <v-col cols="12" md="12">
                <w-text-field
                  v-model="username"
                  class="rounded-lg"
                  label="Nombre de usuario"
                  placeholder="Nombre de usuario"
                  type="email"
                  :rules="rules.requiredInput"
                />
              </v-col>
              <v-col cols="12" md="12">
                <w-text-field
                  v-model="password"
                  class="rounded-lg"
                  label="Contraseña"
                  placeholder="Ingrese su contraseña"
                  :rules="rules.requiredInput"
                  :type="showPass ? 'text' : 'password'"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-container>
            <v-row dense>
              <c-button-confirm
                cols="12"
                text="Iniciar Sesión"
                block
                icon="mdi-arrow-right"
                :loading="loadingLogin"
                :disabled="!valid || loadingLogin"
                @click="handleLogin"
              />
              <c-button-cancel
                cols="12"
                block
                rounded
                icon="mdi-arrow-left"
                iconalign="left"
                text="VOLVER"
                :disabled="loadingLogin"
                @click="handleNextStep(0)"
              />
              <v-col cols="12" class="text-center">
                <v-btn
                  text
                  block
                  rounded
                  @click="handleNextStep(STEP_RECUPERAR)"
                >
                  ¿Olvidaste tu contraseña? Entra aquí
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </w-card>
    </v-col>
    <v-col class="image-mobile" cols="12" md="6" offset-md="1">
      <w-card elevation="0">
        <v-img contain height="70vh" src="@/assets/no-image.png"></v-img>
      </w-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      valid: true,
      showPass: false,
      rules: {
        requiredInput: [
          (val) => (val || "").length > 0 || "Este campo es requerido.",
        ],
      },

      STEP_RECUPERAR: 4,
    };
  },

  computed: {
    ...mapGetters({
      loginRequest: "loginController/getLoginRequest",
      statusLogin: "loginController/getStatusLogin",
      loadingLogin: "loginController/getLoadingLogin",
    }),

    username: {
      get() {
        return this.loginRequest.username;
      },
      set(value) {
        this.actualizarProps({ propiedad: "username", valor: value });
      },
    },
    password: {
      get() {
        return this.loginRequest.password;
      },
      set(value) {
        this.actualizarProps({ propiedad: "password", valor: value });
      },
    },
  },

  methods: {
    ...mapActions({
      actualizarProps: "loginController/actualizarProps",
      login: "loginController/login",
      updateLoginStep: "loginController/updateLoginStep",
      recuperarPassword: "loginController/recuperarPassword",
    }),
    handleNextStep(step) {
      this.updateLoginStep({ step, destino: 0 });
    },
    handleLogin() {
      let formValido = this.$refs.form.validate();

      if (formValido) {
        this.login();
      }
    },
  },
};
</script>

<style>
.gradient {
  background: rgb(205, 16, 46);
  background: linear-gradient(
    180deg,
    rgb(255, 39, 75) 0%,
    rgb(255, 100, 95) 100%
  );
}
</style>