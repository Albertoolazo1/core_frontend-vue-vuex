<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="4" offset-md="1">
      <w-card elevation="0">
        <v-img class="mb-7" src="@/assets/logo.png" height="10vh" contain>
        </v-img>

        <v-card-title>
          <h2 class="mb-7 font-weight-bold">Nueva contraseña</h2>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="formValido" lazy-validation>
            <v-row dense>
              <v-col cols="12" md="12">
                <w-text-field
                  v-model="password"
                  class="rounded-lg"
                  label="Contraseña"
                  placeholder="Ingrese su contraseña"
                  :rules="[rules.requiredInput]"
                  :type="showPass ? 'text' : 'password'"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass"
                />
              </v-col>
              <v-col cols="12" md="12">
                <w-text-field
                  v-model="passwordConfirm"
                  class="rounded-lg"
                  label="Confirmar Contraseña"
                  placeholder="Confirmar contraseña"
                  :rules="[rules.requiredInput, rules.validatePassword]"
                  :type="showPassConfirmar ? 'text' : 'password'"
                  :append-icon="showPassConfirmar ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassConfirmar = !showPassConfirmar"
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
                text="GUARDAR CONTRASEÑA"
                block
                icon="mdi-lock-reset"
                :loading="loadingCambiarPassword"
                :disabled="!formValido || loadingCambiarPassword"
                @click="handleChangePassword"
              />
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
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      showPass: false,
      showPassConfirmar: false,
      passwordConfirm: "",
      formValido: true,
      rules: {
        requiredInput: (val) =>
          (val || "").length > 0 || "Este campo es requerido.",

        validatePassword: (v) =>
          v === this.password || "Las contraseñas no coinciden.",
      },
    };
  },

  computed: {
    ...mapState({
      loginController: "loginController",
    }),
    recuperarPasswordRequest() {
      return this.loginController.recuperarPasswordRequest;
    },
    correoValido() {
      return this.loginController.correoValido;
    },
    loadingCambiarPassword() {
      return this.loginController.loadingCambiarPassword;
    },

    password: {
      get() {
        return this.recuperarPasswordRequest.password;
      },
      set(value) {
        this.actualizarPropsRecuperarPassword({
          propiedad: "password",
          valor: value,
        });
      },
    },
  },

  methods: {
    ...mapActions({
      actualizarPropsRecuperarPassword:
        "loginController/actualizarPropsRecuperarPassword",
      updateLoginStep: "loginController/updateLoginStep",
      cambiarPassword: "loginController/cambiarPassword",
    }),
    handleNextStep(step) {
      this.updateLoginStep({ step, destino: 0 });
    },

    handleChangePassword() {
      let formValido = this.$refs.form.validate();

      if (formValido) {
        this.cambiarPassword();
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