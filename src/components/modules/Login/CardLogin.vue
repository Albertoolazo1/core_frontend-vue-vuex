<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="6" class="text-center">
      <w-card elevation="0" class="pt-10">
        <v-img class="mb-16" height="15vh" contain :src="imgLogo" />
        <v-card-subtitle>
          <h2>Selecciona una opción para continuar</h2>
          <br />
          <h1>Bienvenido:</h1>
        </v-card-subtitle>
        <v-card-text class="mt-16">
          <v-row align="center" justify="center" dense>
            <c-button-confirm
              cols="12"
              md="5"
              text="REGISTRARME"
              @click="handleNextStep(DESTINO_SIGNUP)"
            />
            <v-col cols="12"></v-col>
            <c-button-cancel
              cols="12"
              md="5"
              text="INICIAR SESIÓN"
              @click="handleNextStep(STEP_LOGIN, DESTINO_LOGIN)"
            />
          </v-row>
        </v-card-text>
      </w-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import ImgLogo from "@/assets/logo.png";

export default {
  data() {
    return {
      imgLogo: ImgLogo,
      STEP_LOGIN: 2,
      STEP_SIGNUP: 3,
      DESTINO_LOGIN: 2,
      DESTINO_SIGNUP: 3,
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      updateLoginStep: "loginController/updateLoginStep",
    }),
    handleNextStep(step, destino) {
      this.updateLoginStep({ step, destino });
    },
  },
};
</script>

<style>
</style>