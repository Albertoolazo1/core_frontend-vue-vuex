<template>
  <v-container fluid class="px-13">
    <v-row>
      <v-col cols="12">
        <form-agregar-estado-civil v-show="showFormAgregar" />
      </v-col>
      <v-col>
        <v-divider v-show="showFormAgregar"></v-divider>
      </v-col>
      <v-col cols="12">
        <table-estados-civiles />
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      estadosCivilesController: "estadosCivilesController",
    }),

    showFormAgregar() {
      return this.estadosCivilesController.showFormAgregar;
    },
  },
};
</script>
  
  <style>
</style>