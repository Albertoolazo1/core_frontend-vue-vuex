<template>
  <v-col v-if="cols || md" :cols="cols" :md="md" :offset-md="offsetMd">
    <v-autocomplete
      v-model="estadoCivil"
      dense
      outlined
      label="Estado Civil:"
      item-text="nombre"
      :item-value="itemValue ? itemValue : 'id'"
      :rules="rules"
      :items="listaEstadosCivilesSelect"
      :readonly="readonly"
      :loading="loadingObtenerEstadosCivilesSelect"
      :return-object="returnObject"
      :disabled="disabled || listaEstadosCivilesSelect.length == 0"
    />
  </v-col>
  <v-autocomplete
    v-else
    v-model="estadoCivil"
    dense
    outlined
    label="Estado Civil:"
    item-text="nombre"
    :item-value="itemValue ? itemValue : 'id'"
    :rules="rules"
    :items="listaEstadosCivilesSelect"
    :readonly="readonly"
    :loading="loadingObtenerEstadosCivilesSelect"
    :return-object="returnObject"
    :disabled="disabled || listaEstadosCivilesSelect.length == 0"
  />
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  created() {
    this.obtenerListaEstadosCivilesSelect();
  },

  props: {
    value: {
      type: [Object, Number],
      default() {
        return {};
      },
    },
    cols: { type: [Number, String], default: "" },
    md: { type: [Number, String], default: "" },
    offsetMd: { type: [Number, String], default: "" },
    itemValue: { type: String, default: "id" },
    multiple: {
      type: Boolean,
      default: false,
    },
    readonly: { type: Boolean, default: false },
    returnObject: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    rules: {
      type: Array,
      default() {
        return this.returnObject ? this.rulesEsObjeto : this.rulesN;
      },
    },
  },

  data() {
    return {
      rulesN: [(v) => !!v || "Este campo es requerido."],
      rulesEsObjeto: [
        (v) => (!!v.id && v.id != 0) || "Este campo es requerido.",
      ],
    };
  },

  computed: {
    ...mapState({
      estadosCivilesController: "estadosCivilesController",
    }),
    loadingObtenerEstadosCivilesSelect() {
      return this.estadosCivilesController.loadingObtenerEstadosCivilesSelect;
    },
    listaEstadosCivilesSelect() {
      return this.estadosCivilesController.listaEstadosCivilesSelect;
    },

    estadoCivil: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    ...mapActions({
      showAppMessage: "app/showAppMessage",
      obtenerListaEstadosCivilesSelect:
        "estadosCivilesController/obtenerListaEstadosCivilesSelect",
    }),
  },
};
</script>
