<template>
  <v-col :cols="cols" :md="md" :offset-md="offsetmd" dense>
    <v-row dense>
      <v-col v-if="showFecha" cols="6">
        <w-input-date-basic
          :label="labelFecha"
          v-model="fecha"
          :disabled="readonly || disabled"
          :max="max"
          :min="min"
          :rules="rulesFecha"
        />
      </v-col>
      <v-col v-if="showHora" cols="6">
        <w-text-field
          :label="labelHora"
          type="time"
          outlined
          dense
          v-model="hora"
          :disabled="readonly || fecha == '' || disabled"
          :rules="rulesHora"
          :step="selectSegundos ? 2 : 0"
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  model: { prop: "value", event: "input" },

  mounted: function () {
    if (this.cmpValue && this.cmpValue != "") {
      let fechaAux = this.cmpValue.substring(0, 10);
      let horaAux = this.cmpValue.substring(11, this.cmpValue.length);

      this.fecha = fechaAux;
      this.hora = horaAux;
    }
  },

  props: {
    labelFecha: { type: String, default: "Fecha" },
    labelHora: { type: String, default: "Hora" },
    cols: { type: [String, Number] },
    md: { type: [String, Number], default: "" },
    offsetmd: { type: [String, Number] },
    value: {
      type: [Object, Number, String],
      default: new Date().toISOString() + " " + new Date().toTimeString(),
    },
    showFecha: { type: Boolean, default: true },
    showHora: { type: Boolean, default: true },
    readonly: {
      type: Boolean,
      default: false,
    },
    rulesFecha: {
      type: [Object, Array],
    },
    rulesHora: {
      type: [Object, Array],
    },
    max: {
      type: String,
      default: "3000-01-01",
    },
    min: {
      type: String,
      default: "1900-01-01",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selectSegundos: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      fecha: "",
      hora: "",
    };
  },

  computed: {
    cmpValue: {
      get: function () {
        return String(this.value);
      },
      set: function (newValue) {
        this.$emit("input", String(newValue));
      },
    },
  },

  methods: {},

  watch: {
    fecha(v) {
      if (this.cmpValue != null && this.cmpValue != undefined) {
        this.cmpValue = v + " " + this.hora;
      }
    },
    hora(v) {
      if (this.cmpValue != null && this.cmpValue != undefined) {
        this.cmpValue = this.fecha + " " + v;
      }
    },

    value(nuevoValor) {
      if (nuevoValor && nuevoValor != "") {
        let fechaAux = nuevoValor.substring(0, 10);
        let horaAux = nuevoValor.substring(11);
        this.fecha = fechaAux;
        this.hora = horaAux;
      } else if (!(nuevoValor?.trim()?.length > 0)) {
        this.fecha = "";
        this.hora = "";
      }
    },
  },
};
</script>

<style>
</style>