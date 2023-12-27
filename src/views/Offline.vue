<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center" class="mt-2">
      <v-card rounded="lg" height="100%" width="100%" class="py-15 mx-3">
        <v-row align="center" justify="center">
          <v-col cols="12" md="12" class="text-center">
            <v-img height="150" contain :src="imgLogo" class="mb-10"></v-img>
            <h3 class="text-md-h3 primary--text pt-5 font-weight-bold">
              ¡Oops!
            </h3>
            <v-card-text>
              Usted no está conectado a Internet. Verifique su conexión e
              inténtelo de nuevo.
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ImgLogo from "@/assets/logo.png";
export default {
  data() {
    return {
      imgLogo: ImgLogo,
    };
  },
};
</script>

<style>
</style>