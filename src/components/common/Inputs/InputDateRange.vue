<template>
  <v-row dense>
    <v-col cols="12" md="">
      <c-input-date-basic
        v-model="rango.fechaInicio"
        class="rounded-lg"
        esRango
        :label="'Fecha Inicio'"
        :min="'1950-01-01'"
        :max="rango.fechaFin"
        :fechaRango="rango.fechaFin"
        :position="0"
      />
    </v-col>
    <v-col cols="12" md="">
      <c-input-date-basic
        v-model="rango.fechaFin"
        class="rounded-lg"
        esRango
        :label="'Fecha Fin'"
        :min="'1950-01-01'"
        :max="
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10)
        "
        :fechaRango="rango.fechaInicio"
        :position="1"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  model: { prop: "value", event: "input" },

  props: {
    value: {
      type: [Object],
      default() {
        return {
          fechaInicio: "",
          fechaFin: "",
          todos: false,
        };
      },
    },
  },

  data() {
    return {};
  },

  computed: {
    rango: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },

  methods: {},

  watch: {},
};
</script>

<style>
</style>