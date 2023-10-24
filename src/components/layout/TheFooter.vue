<template>
  <v-footer class="mt-5" padless color="primary">
    <v-col class="white--text text-center" cols="12" md="4">
      <span>Nosotros</span>
    </v-col>
    <v-col class="white--text text-center" cols="12" md="4">
      <span>Aviso de Privacidad</span>
    </v-col>
    <v-col class="white--text text-center" cols="12" md="4">
      <span>Ayuda</span>
    </v-col>

    <v-col class="text-center white--text text-caption" cols="12">
      {{ new Date().getFullYear() }} — <b>Core</b> —
      {{ "v" + version }}
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",

  data() {
    return {
      version: process.env.VUE_APP_VERSION,
    };
  },

  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>