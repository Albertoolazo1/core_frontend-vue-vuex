<template>
  <v-container fluid class="px-13">
    <v-row>
      <v-col cols="12">
        <form-agregar-usuario v-show="showFormAgregar" />
      </v-col>
      <v-col>
        <v-divider v-show="showFormAgregar"></v-divider>
      </v-col>
      <v-col cols="12">
        <table-usuarios />
      </v-col>
    </v-row>
  </v-container>
</template>
    
    <script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      usuariosController: "usuariosController",
    }),

    showFormAgregar() {
      return this.usuariosController.showFormAgregar;
    },
  },
};
</script>
    
    <style>
</style>