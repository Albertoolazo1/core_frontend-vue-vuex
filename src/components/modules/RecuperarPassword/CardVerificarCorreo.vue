<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="4" offset-md="1">
      <w-card elevation="0">
        <v-img class="mb-7" :src="imgLogo" height="10vh" contain> </v-img>

        <v-card-title>
          <h2 class="font-weight-bold">Recuperar contraseña</h2>
          <span class="mb-3 text-subtitle-1">
            Recibirás un correo con un código, válido por 5 minutos.
          </span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="formValido" lazy-validation>
            <v-row dense>
              <v-col cols="12" md="12">
                <w-text-field
                  v-model="username"
                  class="rounded-lg"
                  label="Nombre de usuario"
                  placeholder="Nombre de usuario"
                  type="email"
                  :rules="[rules.requiredInput, rules.email]"
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
                text="SIGUIENTE"
                block
                icon="mdi-arrow-right"
                :loading="loadingObtenerCodigo"
                :disabled="!formValido || loadingObtenerCodigo"
                @click="handleObtenerCodigo"
              />
              <c-button-cancel
                cols="12"
                block
                rounded
                icon="mdi-arrow-left"
                iconalign="left"
                text="VOLVER"
                :disabled="loadingObtenerCodigo"
                @click="handleNextStep(2)"
              />
            </v-row>
          </v-container>
        </v-card-actions>
      </w-card>
    </v-col>
    <v-col class="image-mobile" cols="12" md="6" offset-md="1">
      <w-card elevation="0">
        <v-img contain height="70vh" :src="imgNoImage"></v-img>
      </w-card>
    </v-col>
  </v-row>
</template>
  
  <script>
import { mapActions, mapState } from "vuex";
import ImgLogo from "@/assets/logo.png";
import ImgNoImage from "@/assets/no-image.png";

export default {
  data() {
    return {
      imgLogo: ImgLogo,
      imgNoImage: ImgNoImage,
      formValido: true,
      rules: {
        requiredInput: (val) =>
          (val || "").length > 0 || "Este campo es requerido.",

        email: (v) => {
          const pattern = /^[\S]+@([\w-]+\.)+[\w-]{2,4}$/;
          return pattern.test(v) || "No cumple con el formato para email.";
        },
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
    loadingObtenerCodigo() {
      return this.loginController.loadingObtenerCodigo;
    },

    username: {
      get() {
        return this.recuperarPasswordRequest.username;
      },
      set(value) {
        this.actualizarPropsRecuperarPassword({
          propiedad: "username",
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
      obtenerCodigo: "loginController/obtenerCodigo",
    }),
    handleNextStep(step) {
      this.updateLoginStep({ step, destino: 0 });
    },

    handleObtenerCodigo() {
      let formValido = this.$refs.form.validate();

      if (formValido) {
        this.obtenerCodigo();
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