<template>
  <v-col :cols="cols" :md="md" :offset-md="offsetmd" dense>
    <w-file-input
      v-model="documento"
      :accept="typeFile"
      show-size
      :label="label"
      outlined
      class="rounded-lg"
      dense
      :truncate-length="truncate"
      :hint="hintText"
      :multiple="multiple"
      :messages="messages"
      :rules="rules"
    >
      <template v-slot:selection="{ text }">
        <v-chip small label :color="color">
          {{ text }}
        </v-chip>
      </template>
      <template v-slot:append>
        <slot> </slot>
      </template>
    </w-file-input>
  </v-col>
</template>

<script>
export default {
  model: { prop: "value", event: "input" },
  props: {
    label: {
      type: String,
      default: "Archivo",
    },

    typeFile: { type: String },
    cols: { type: Number },
    md: { type: [String, Number], default: "" },
    offsetmd: { type: Number },
    value: {
      type: [File, Object, Array],
    },
    color: { type: String, default: "primary" },
    truncate: {
      type: [String, Number],
      default: 0,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    hintText: { type: String, default: "" },
    messages: { type: String, default: "" },
    rules: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  computed: {
    documento: {
      get: function () {
        return this.value;
      },
      set: function (newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>

<style>
</style>