<template>
  <v-container fluid>
    <w-card :loading="loadingGuardarUsuario || loadingEliminarUsuario">
      <v-card-subtitle>
        <v-row justify="center">
          <v-col>
            <h2>Usuarios</h2>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="3">
            <v-text-field
              v-model="search"
              placeholder="Buscar"
              label="Búsqueda..."
              append-icon="mdi-magnify"
              outlined
              dense
            />
          </v-col>
          <c-button-confirm
            cols="1"
            icon="mdi-reload"
            :text="''"
            :loading="loadingObtenerUsuarios"
            :disabled="loadingObtenerUsuarios"
            @click="obtenerUsuarios"
          />
          <c-button-confirm
            v-show="!showFormAgregar"
            cols="2"
            icon="mdi-plus"
            iconalign="left"
            text="Nuevo"
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
            <template v-if="loadingObtenerUsuarios">
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
              :items="listaUsuarios"
              :search="search"
              :custom-filter="customSearch"
            >
              <template v-slot:[`item.nombreCompleto`]="{ item }">
                <span>{{ getNombreCompleto(item) }}</span>
              </template>
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
              <template v-slot:[`item.tipo`]="{ item }">
                <v-chip
                  class="white--text"
                  small
                  :color="getTipoColor(item.ccPerfil?.clave)"
                >
                  {{ item.ccPerfil?.nombre }}
                </v-chip>
              </template>
              <template v-slot:[`item.creadoPor`]="{ item }">
                <div
                  v-if="
                    item.ccPerfil?.clave === '02' &&
                    item.cliente &&
                    item.cliente != null &&
                    item.cliente?.agente != null
                  "
                >
                  <v-chip class="white--text" small color="purple">
                    <b>{{ getNombreCompletoAgente(item.cliente?.agente) }}</b>
                  </v-chip>
                </div>
                <div v-else>
                  <div v-if="item.ccPerfil?.clave === '02'">
                    <b>Sin agente asignado</b>
                  </div>
                  <div v-else>--</div>
                </div>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <div v-if="item.cliente && item.cliente.id != 0">
                  <div v-if="!item.cliente || !item.cliente.agente">
                    <v-btn icon @click="editarUsuario(item)">
                      <v-icon small>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="handleEliminar(item)">
                      <v-icon small>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-chip small>
                      <b>Solo editable por el agente</b>
                    </v-chip>
                    <v-btn icon @click="handleEliminar(item)">
                      <v-icon small>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
                <div
                  v-else-if="
                    (!item.cliente || item.cliente.id === 0) &&
                    item.ccPerfil?.clave === '02'
                  "
                >
                  <v-chip small>
                    <b>No ha iniciado el taller patrimonial</b>
                  </v-chip>
                  <v-btn icon @click="handleEliminar(item)">
                    <v-icon small>mdi-trash-can</v-icon>
                  </v-btn>
                </div>
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
    this.obtenerUsuarios();
  },

  computed: {
    ...mapState({
      usuariosController: "usuariosController",
    }),

    showFormAgregar() {
      return this.usuariosController.showFormAgregar;
    },
    listaUsuarios() {
      return this.usuariosController.listaUsuarios;
    },
    loadingObtenerUsuarios() {
      return this.usuariosController.loadingObtenerUsuarios;
    },
    loadingGuardarUsuario() {
      return this.usuariosController.loadingGuardarUsuario;
    },
    loadingEliminarUsuario() {
      return this.usuariosController.loadingEliminarUsuario;
    },
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Nombre",
          value: "nombreCompleto",
        },
        {
          text: "Nombre de usuario",
          value: "username",
        },
        {
          text: "Fecha Registro",
          value: "fechaRegistro",
        },
        {
          text: "Tipo",
          value: "tipo",
        },
        {
          text: "Creado Por",
          value: "creadoPor",
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
      obtenerUsuarios: "usuariosController/obtenerListaUsuarios",
      toggleShowFormAgregar: "usuariosController/toggleShowFormAgregar",
      editarUsuario: "usuariosController/editarUsuario",
      eliminarUsuario: "usuariosController/eliminarUsuario",

      showConfirmNuevoRegistro: "app/showConfirmNuevoRegistro",
    }),

    handleEliminar(item) {
      this.showConfirmNuevoRegistro({
        title: "Se eliminará el Usuario ¿Desea continuar?",
        description: "description",
        callback: () => {
          this.eliminarUsuario(item);
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
    getNombreCompleto(item) {
      const nombre = item.nombre;
      const apellidoPaterno = item.apellidoPaterno;
      const apellidoMaterno = item.apellidoMaterno;

      return nombre + " " + apellidoPaterno + " " + apellidoMaterno;
    },
    getTipoColor(tipo) {
      const mapColores = {
        "01": "green",
        "02": "red",
        "03": "purple",
      };

      return mapColores[tipo];
    },
    getNombreCompletoAgente(agente) {
      if (agente) {
        return (
          agente.nombre +
          " " +
          agente.apellidoPaterno +
          " " +
          agente.apellidoMaterno
        );
      }
    },

    customSearch(values, search, item) {
      const agente = item.cliente?.agente ?? {};
      const searchText = search.toLowerCase();

      const textOne =
        item.nombre.toLowerCase() +
        " " +
        item.apellidoPaterno.toLowerCase() +
        " " +
        item.apellidoMaterno.toLowerCase();
      const textTwo = String(item.ccPerfil?.nombre).toLowerCase();
      const textThree =
        agente && agente.nombre
          ? agente.nombre.toLowerCase() +
            " " +
            agente.apellidoPaterno.toLowerCase() +
            " " +
            agente.apellidoMaterno.toLowerCase()
          : "";
      const textFour = String(item.fechaRegistro).toLowerCase();
      const textFive = String(item.username).toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1 ||
        textThree.indexOf(searchText) > -1 ||
        textFour.indexOf(searchText) > -1 ||
        textFive.indexOf(searchText) > -1
      );
    },
  },
};
</script>
  
  <style>
</style>