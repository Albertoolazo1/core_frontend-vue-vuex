<template>
  <v-container fluid>
    <w-card :loading="loadingGuardarEstadoCivil || loadingEliminarEstadoCivil">
      <v-card-subtitle>
        <v-row>
          <v-col>
            <h2>Estados Civiles</h2>
          </v-col>
          <v-spacer></v-spacer>
          <c-button-confirm
            cols="1"
            icon="mdi-reload"
            :text="''"
            :loading="loadingObtenerEstadosCiviles"
            :disabled="loadingObtenerEstadosCiviles"
            @click="obtenerListaEstadosCiviles"
          />
          <c-button-confirm
            v-show="!showFormAgregar"
            cols="3"
            icon="mdi-plus"
            iconalign="left"
            text="Nuevo Estado Civil"
            @click="toggleShowFormAgregar(true)"
          />
          <c-button-cancel
            v-show="showFormAgregar"
            cols="2"
            icon="mdi-minus"
            iconalign="left"
            text="Cancelar"
            @click="toggleShowFormAgregar(false)"
          />
        </v-row>
      </v-card-subtitle>

      <v-card-text>
        <v-row>
          <v-col>
            <template v-if="loadingObtenerEstadosCiviles">
              <v-data-table :headers="headers" dense>
                <template slot="no-data">
                  <v-skeleton-loader
                    class="mx-1"
                    type="table-tbody"
                  ></v-skeleton-loader>
                </template>
              </v-data-table>
            </template>
            <v-data-table
              v-else
              dense
              :headers="headers"
              :items="listaEstadosCiviles"
            >
              <template v-slot:[`item.esActivo`]="{ item }">
                <v-chip small pill color="transparent">
                  <v-chip
                    class="mr-1 pa-2"
                    :color="getEsActivoColor(item.esActivo)"
                    x-small
                    pill
                  >
                  </v-chip>
                  {{ getEsActivoText(item.esActivo) }}
                </v-chip>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn icon @click="editarEstadoCivil(item)">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="handleEliminar(item)">
                  <v-icon small>mdi-trash-can</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </w-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  created() {
    this.obtenerListaEstadosCiviles();
  },

  computed: {
    ...mapState({
      estadosCivilesController: "estadosCivilesController",
    }),

    showFormAgregar() {
      return this.estadosCivilesController.showFormAgregar;
    },
    listaEstadosCiviles() {
      return this.estadosCivilesController.listaEstadosCiviles;
    },
    loadingObtenerEstadosCiviles() {
      return this.estadosCivilesController.loadingObtenerEstadosCiviles;
    },
    loadingGuardarEstadoCivil() {
      return this.estadosCivilesController.loadingGuardarEstadoCivil;
    },
    loadingEliminarEstadoCivil() {
      return this.estadosCivilesController.loadingEliminarEstadoCivil;
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Clave",
          value: "clave",
        },
        {
          text: "Estado Civil",
          value: "nombre",
        },
        {
          text: "Activo",
          value: "esActivo",
        },
        {
          text: "",
          value: "actions",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      obtenerListaEstadosCiviles:
        "estadosCivilesController/obtenerListaEstadosCiviles",
      toggleShowFormAgregar: "estadosCivilesController/toggleShowFormAgregar",
      editarEstadoCivil: "estadosCivilesController/editarEstadoCivil",
      eliminarEstadoCivil: "estadosCivilesController/eliminarEstadoCivil",

      showConfirmNuevoRegistro: "app/showConfirmNuevoRegistro",
    }),

    handleEliminar(item) {
      this.showConfirmNuevoRegistro({
        title: "Se eliminara el Estado Civil ¿Desea continuar?",
        description: "description",
        callback: () => {
          this.eliminarEstadoCivil(item);
        },
      });
    },

    getEsActivoText(esActivo) {
      if (esActivo) return "SI";
      if (!esActivo) return "NO";
    },
    getEsActivoColor(esActivo) {
      if (esActivo) return "green";
      if (!esActivo) return "orange";
    },
  },
};
</script>

<style>
</style>