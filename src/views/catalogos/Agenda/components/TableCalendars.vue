<template>
  <c-basic-card class="mt-2" rounded="lg" :loading="loadingEnviarDatos">
    <v-card-subtitle>
      {{ "Calendarios de días festivos" }}
    </v-card-subtitle>
    <v-container fluid>
      <v-row dense class="mb-3">
        <v-col cols="10"> </v-col>

        <c-confirm-button
          cols="6"
          md="1"
          offsetmd="6"
          block
          text=""
          icon="mdi-plus"
          @click="onVerFormAgregarCalendario"
        />
        <c-cancel-button
          cols="6"
          md="1"
          block
          text=""
          icon="mdi-reload"
          tooltip="Recargar Calendarios"
          :loading="loadingObtenerDatos"
          :disabled="loadingObtenerDatos"
          @click="onRecargar"
        />
        <v-col cols="12" md="4">
          <!-- Here in the v-model we indicate that search have coincide
                 with the textfield, and the v-database respond to this search -->
          <c-text-field
            label="Search"
            v-model="search"
            append-icon="mdi-magnify"
          ></c-text-field>
        </v-col>
      </v-row>
      <div v-if="loadingObtenerDatos">
        <v-data-table :headers="headers" dense>
          <template slot="no-data">
            <v-skeleton-loader class="mx-1" type="table-tbody" />
          </template>
        </v-data-table>
      </div>
      <v-data-table
        v-else
        :items="calendarios"
        :headers="headers"
        dense
        :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="ma-1 rounded-pill"
                small
                elevation="0"
                color="transparent"
                @click="onEditar(item)"
              >
                <v-icon small>mdi-lead-pencil</v-icon>
              </v-btn>
            </template>
            <span>Editar</span>
          </v-tooltip>

          <modal-ver-calendario :item="item" />
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="ma-1 rounded-pill"
                small
                elevation="0"
                color="transparent"
                @click="onCopiarCalendario(item)"
              >
                <v-icon small>mdi-clipboard-file</v-icon>
              </v-btn>
            </template>
            <span>Copiar</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-container>

    <c-confirm-dialog
      :show="showDialog"
      :text="'¿Desea eliminar el Calendario?'"
      @confirm="confirmarEliminar()"
      @cancel="cancelarEliminar()"
      @setShowDialog="setShowDialog($event)"
    />
  </c-basic-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
/* import ModalVerCalendario from "./ModalVerCalendario.vue"; */
export default {
  /*  components: { ModalVerCalendario }, */
  created() {
    /* this.obtenerCalendarios(); */
  },

  data() {
    return {
      headers: [
        {
          text: "Año",
          value: "anio",
        },
        {
          text: "País",
          value: "ccPais.nombre",
        },
        {
          text: "",
          value: "actions",
          width: "20vw",
        },
      ],
      search: "",
      showDialog: false,
    };
  },

  computed: {
    ...mapGetters({
      calendarios: "diasFestivosController/getCalendarios",
      loadingObtenerDatos: "diasFestivosController/getLoadingObtenerDatos",
      loadingEnviarDatos: "diasFestivosController/getLoadingEnviarDatos",
    }),
  },

  methods: {
    ...mapActions({
      toggleVerFormAgregarCalendario:
        "diasFestivosController/toggleVerFormAgregarCalendario",
      obtenerCalendarios: "diasFestivosController/obtenerCalendarios",
      seleccionarCalendarioDiasFestivos:
        "diasFestivosController/seleccionarCalendarioDiasFestivos",
      copiarCalendarioDiasFestivos:
        "diasFestivosController/copiarCalendarioDiasFestivos",
      editarCalendario: "diasFestivosController/editarCalendario",
      eliminarCalendario: "diasFestivosController/eliminarCalendario",
    }),
    onVerFormAgregarCalendario() {
      this.toggleVerFormAgregarCalendario(true);
    },
    onRecargar() {
      this.obtenerCalendarios();
    },
    onEditar(item) {
      if (item) {
        this.editarCalendario(item);
      }
    },
    onCopiarCalendario(item) {
      if (item) {
        this.copiarCalendarioDiasFestivos(item);
      }
    },

    setShowDialog(v) {
      this.showDialog = v;
    },
    showDialogEliminarGrua(item) {
      this.seleccionarCalendarioDiasFestivos(item);
      this.setShowDialog(true);
    },
    confirmarEliminar() {
      this.eliminarCalendario();
      this.setShowDialog(false);
    },
    cancelarEliminar() {
      this.seleccionarCalendarioDiasFestivos(null);
      this.setShowDialog(false);
    },
  },
};
</script>

<style></style>
