<template>
  <v-container fluid>
    <w-card class="px-16">
      <v-card-title>Agregar Estado Civil</v-card-title>

      <v-card-text>
        <v-container class="px-16">
          <v-form ref="form" lazy-validation>
            <v-row dense align="center" justify="center">
              <v-col cols="4">
                <w-text-field
                  v-model="clave"
                  label="Clave"
                  maxLength="2"
                  :disabled="id != 0"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="4">
                <w-text-field
                  v-model="nombre"
                  label="Nombre"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>
            <v-row dense align="center" justify="center">
              <v-col cols="2">
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
              text="Agregar"
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
      },
    };
  },
  computed: {
    ...mapState({
      estadosCivilesController: "estadosCivilesController",
    }),

    estadoCivil() {
      return this.estadosCivilesController.estadoCivil;
    },
    showFormAgregar() {
      return this.estadosCivilesController.showFormAgregar;
    },

    id() {
      return this.estadoCivil.id;
    },
    clave: {
      get() {
        return this.estadoCivil.clave;
      },
      set(value) {
        this.updatePropsEstadoCivil({ prop: "clave", value });
      },
    },
    nombre: {
      get() {
        return this.estadoCivil.nombre;
      },
      set(value) {
        this.updatePropsEstadoCivil({ prop: "nombre", value });
      },
    },
    esActivo: {
      get() {
        return this.estadoCivil.esActivo;
      },
      set(value) {
        this.updatePropsEstadoCivil({ prop: "esActivo", value });
      },
    },
  },
  methods: {
    ...mapActions({
      updatePropsEstadoCivil: "estadosCivilesController/updateProps",
      toggleShowFormAgregar: "estadosCivilesController/toggleShowFormAgregar",
      guardarEstadoCivil: "estadosCivilesController/guardarEstadoCivil",
      showAppMessage: "app/showAppMessage",
    }),

    handleGuardar() {
      const formValido = this.$refs.form.validate();

      if (formValido) {
        this.guardarEstadoCivil();
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
  },
};
</script>

<style>
</style>