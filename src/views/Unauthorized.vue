<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center" class="mt-2">
      <v-card rounded="lg" height="100%" width="100%" class="py-15 mx-3">
        <v-row align="center" justify="center">
          <v-col cols="12" md="12" class="text-center">
            <v-img height="150" contain :src="imgLogo" class="mb-10"></v-img>
            <h1 class="primary--text pt-5">¡Oops!</h1>
            <v-card-text>
              Parece que no tienes permiso para ver este contenido, contacta a
              tu administrador.
            </v-card-text>
          </v-col>
          <v-col
            v-if="userLocal.ccPerfil.clave != '01'"
            cols="12"
            class="text-center"
          >
            <router-link to="/"> Volver </router-link>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { appStorage } from "../_helpers";
import ImgLogo from "@/assets/logo.png";

export default {
  data() {
    return {
      imgLogo: ImgLogo,
      userLocal: appStorage.getUser(),
    };
  },
};
</script>

<style>
</style>