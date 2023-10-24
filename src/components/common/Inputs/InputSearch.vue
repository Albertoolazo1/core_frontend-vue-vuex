<template>
  <v-col :cols="cols" :md="md" :offset-md="offsetmd">
    <w-text-field
      class="rounded-lg"
      :class="{
        'input-x-small': xSmall,
        'input-small': small,
      }"
      v-model.trim="valor"
      dense
      outlined
      :clearable="!readonly"
      append-icon="mdi-magnify"
      :maxlength="length"
      :label="label"
      :placeholder="placeholder"
      :loading="loading"
      :disabled="loading || disabled"
      :readonly="readonly"
      :rules="rules"
      @click:append="onSearch()"
      @keydown.enter="onSearch()"
      @click:clear="onClear()"
    />
  </v-col>
</template>

<script>
export default {
  model: { prop: "value", event: "input" },
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
      default: "Buscar",
    },
    placeholder: {
      type: String,
      default: "",
    },
    cols: { type: [Number, String] },
    md: { type: [String, Number], default: "" },
    offsetmd: { type: Number },
    rules: {
      type: Array,
      default() {
        return [];
      },
    },
    length: {
      type: [Number, String],
      default: 5,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    xSmall: { type: Boolean, default: false },
  },

  computed: {
    valor: {
      get: function () {
        return this.value;
      },
      set: function (newValue) {
        this.$emit("input", newValue);
      },
    },
  },

  methods: {
    onSearch() {
      this.$emit("search", this.valor);
    },
    onClear() {
      this.valor = "";
      this.$emit("clear");
    },
  },
};
</script>

<style>
</style>