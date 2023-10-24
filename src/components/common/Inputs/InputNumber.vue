<template>
  <v-col :cols="cols" :md="md" :offset-md="offsetmd">
    <w-text-field
      v-model="numberValue"
      @keypress="keyPress"
      @paste="onPaste"
      :label="label"
      :rules="rules"
      class="rounded-lg"
      type="number"
      hide-spin-buttons
      :disabled="disabled"
      :prefix="options.prefix"
      :suffix="options.suffix"
    />
  </v-col>
</template>
<script>
export default {
  model: { prop: "value", event: "input" },
  props: {
    label: {
      type: String,
      default: "",
    },
    cols: { type: [String, Number] },
    md: { type: [String, Number], default: "" },
    offsetmd: { type: Number },
    value: {
      type: [String, Number],
      default: "",
    },
    maxLength: {
      type: Number,
      default: 20,
    },
    rules: {
      type: Array,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: function () {
        return {
          prefix: "",
          suffix: "",
          precision: 2,
        };
      },
    },
  },
  computed: {
    numberValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    keyPress(event) {
      let keyCode = event.keyCode ? event.keyCode : event.which;
      if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
      } else {
        let isSelected = window.getSelection().toString().length > 0;
        if (!isSelected && this.value.length >= this.maxLength) {
          event.preventDefault();
        }
      }
    },
    onPaste(event) {
      let text = event.clipboardData.getData("text");
      let quitarNoNumericos = text.replaceAll(/[^0-9]/g, "");
      if (this.maxLength > 0) {
        quitarNoNumericos = quitarNoNumericos.substr(0, this.maxLength);
      }
      this.numberValue = quitarNoNumericos;
      event.preventDefault();
    },
  },
};
</script>
