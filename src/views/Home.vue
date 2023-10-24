<template>
  <v-container fill-height>
    <h1>Bienvenido</h1>

    <v-container fill-height>
      <v-row dense justify="center">
        <v-col align="center">
          <v-sheet>
            <h2>Contador: {{ contador }}</h2>
            <br />
            <h3>Contador x3: {{ tresVecesContador }}</h3>

            <br />

            <v-btn color="primary" @click="sumarUnoContador">
              SUMAR
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  props: {},

  data() {
    return {};
  },

  computed: {
    ...mapState({
      homeController: "homeController",
    }),
    ...mapGetters({
      tresVecesContador: "homeController/tresVecesContador",
    }),

    contador() {
      return this.homeController.contador;
    },
  },

  methods: {
    ...mapActions({
      sumarUnoContador: "homeController/sumarUnoContador",
    }),
  },

  watch: {},
};
</script>

<style>
</style>