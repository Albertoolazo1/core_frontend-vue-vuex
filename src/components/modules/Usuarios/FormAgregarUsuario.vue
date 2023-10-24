<template>
  <v-container fluid>
    <w-card class="px-16">
      <v-card-title>Agregar Usuario</v-card-title>

      <v-card-text>
        <v-container class="px-16">
          <v-form ref="form" lazy-validation>
            <v-row dense>
              <v-col cols="4">
                <w-text-field
                  v-model="nombre"
                  label="Nombre"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="4">
                <w-text-field
                  v-model="apellidoPaterno"
                  label="Apellido Paterno"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="4">
                <w-text-field
                  v-model="apellidoMaterno"
                  label="Apellido Materno"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="4">
                <w-text-field
                  v-model="username"
                  label="Correo Electrónico"
                  :rules="[rules.required, rules.email]"
                />
              </v-col>
              <select-perfiles
                v-if="clavePerfil != '02'"
                v-model="ccPerfil"
                cols="12"
                md="4"
                :disabled="
                  id > 0 && (clavePerfil === '01' || clavePerfil === '03')
                "
                esAdmin
                return-object
              />
              <select-agentes
                v-if="clavePerfil === '02'"
                v-model="cliente.agenteId"
                cols="12"
                md="4"
              />
            </v-row>
            <v-row dense align="center" justify="center">
              <v-col cols="1">
                <v-switch
                  v-model="esActivo"
                  label="Activo"
                  inset
                  color="green"
                  :false-value="0"
                  :true-value="1"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-container>
          <v-row dense align="center" justify="end">
            <c-button-cancel
              cols="2"
              text="Cancelar"
              @click="toggleShowFormAgregar(false)"
            />
            <c-button-confirm
              cols="2"
              :text="id > 0 ? 'Guardar Cambios' : 'Guardar'"
              icon="mdi-save"
              @click="handleGuardar"
            />
          </v-row>
        </v-container>
      </v-card-actions>
    </w-card>
  </v-container>
</template>
  
  <script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      rules: {
        required: (val) => val != "" || "Este campo es requerido",
        email: (v) => {
          const pattern = /^[\S]+@([\w-]+\.)+[\w-]{2,4}$/;
          return pattern.test(v) || "No cumple con el formato para email.";
        },
      },
    };
  },
  computed: {
    ...mapState({
      usuariosController: "usuariosController",
    }),

    usuario() {
      return this.usuariosController.usuario;
    },
    showFormAgregar() {
      return this.usuariosController.showFormAgregar;
    },

    id() {
      return this.usuario.id;
    },
    nombre: {
      get() {
        return this.usuario.nombre;
      },
      set(value) {
        this.updatePropsUsuario({ prop: "nombre", value });
      },
    },
    apellidoPaterno: {
      get() {
        return this.usuario.apellidoPaterno;
      },
      set(value) {
        this.updatePropsUsuario({ prop: "apellidoPaterno", value });
      },
    },
    apellidoMaterno: {
      get() {
        return this.usuario.apellidoMaterno;
      },
      set(value) {
        this.updatePropsUsuario({ prop: "apellidoMaterno", value });
      },
    },
    username: {
      get() {
        return this.usuario.username;
      },
      set(value) {
        this.updatePropsUsuario({ prop: "username", value });
      },
    },
    correoElectronico: {
      get() {
        return this.usuario.correoElectronico;
      },
      set(value) {
        this.updatePropsUsuario({
          prop: "correoElectronico",
          value,
        });
      },
    },
    ccPerfil: {
      get() {
        return this.usuario.ccPerfil;
      },
      set(value) {
        this.updatePropsUsuario({ prop: "ccPerfil", value });
      },
    },
    clavePerfil() {
      return this.ccPerfil?.clave ?? 0;
    },
    ccPerfilId: {
      get() {
        return this.usuario.ccPerfilId;
      },
      set(value) {
        this.updatePropsUsuario({ prop: "ccPerfilId", value });
      },
    },
    cliente: {
      get() {
        return this.usuario.cliente;
      },
      set(value) {
        this.updatePropsUsuario({ prop: "cliente", value });
      },
    },
    esActivo: {
      get() {
        return this.usuario.esActivo;
      },
      set(value) {
        this.updatePropsUsuario({ prop: "esActivo", value });
      },
    },
  },
  methods: {
    ...mapActions({
      updatePropsUsuario: "usuariosController/updateProps",
      toggleShowFormAgregar: "usuariosController/toggleShowFormAgregar",
      guardarUsuario: "usuariosController/guardarUsuario",
      showAppMessage: "app/showAppMessage",
    }),

    handleGuardar() {
      const formValido = this.$refs.form.validate();

      if (formValido) {
        this.guardarUsuario();
      } else {
        this.showAppMessage({
          type: "warning",
          text: "Faltan campos requeridos",
        });
      }
    },
  },
  watch: {
    showFormAgregar() {
      this.$refs.form.resetValidation();
    },
    ccPerfil(newVal) {
      if (newVal) {
        this.ccPerfilId = newVal.id;
      }
    },
    username(newVal) {
      this.correoElectronico = newVal;
    },
  },
};
</script>
  
  <style>
</style>