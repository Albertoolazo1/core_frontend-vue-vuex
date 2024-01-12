<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="4" offset-md="1">
      <w-card elevation="0">
        <v-img class="mb-7" :src="imgLogo" height="10vh" contain> </v-img>

        <v-card-title>
          <h2 class="font-weight-bold">Validar código</h2>
          <span class="mb-3 text-subtitle-1">
            Ingresa el código de 6 dígitos que se envió a tu correo
          </span>
        </v-card-title>

        <v-card-text>
          <v-row dense align="center" justify="center">
            <v-col cols="12" md="8">
              <v-otp-input
                v-model="codigoVerificacion"
                length="6"
                type="number"
                :disabled="loadingValidarCodigo"
                @finish="validarCodigo"
              ></v-otp-input>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-container>
            <v-row dense>
              <v-col cols="12" class="text-center">
                <span class="primary--text">¿No recibiste el código?</span>
                <v-btn
                  text
                  block
                  rounded
                  @click="handleNextStep(STEP_RECUPERAR)"
                >
                  Reenviar código
                </v-btn>
              </v-col>
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
    };
  },

  computed: {
    ...mapState({
      loginController: "loginController",
    }),
    recuperarPasswordRequest() {
      return this.loginController.recuperarPasswordRequest;
    },
    loadingValidarCodigo() {
      return this.loginController.loadingValidarCodigo;
    },

    codigoVerificacion: {
      get() {
        return this.recuperarPasswordRequest.codigoVerificacion;
      },
      set(value) {
        this.actualizarPropsRecuperarPassword({
          propiedad: "codigoVerificacion",
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
      validarCodigo: "loginController/validarCodigo",
      obtenerCodigo: "loginController/obtenerCodigo",
    }),
    handleNextStep(step) {
      this.updateLoginStep({ step, destino: 0 });
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