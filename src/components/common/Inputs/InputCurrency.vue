<template>
  <v-col :cols="cols" :md="md" :offset-md="offsetmd" dense>
    <w-text-field
      v-model="cmpValue"
      :label="label"
      :placeholder="placeholder"
      :hide-details="hideDetails"
      :error="error"
      :rules="rules"
      :prefix="options.prefix"
      :suffix="options.suffix"
      :disabled="disabled"
      :readonly="readonly"
      :class="{
        'input-small': small,
      }"
      v-on:keypress="keyPress"
    >
      <template v-slot:label>
        <slot name="label"></slot>
      </template>

      <v-icon v-if="picon" slot="prepend-inner" small>
        {{ picon }}
      </v-icon>
      <v-icon v-if="icon" slot="append" small> {{ icon }} </v-icon>

      <v-menu v-if="appendMenu" slot="prepend" small top offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" color="primary">
            {{ appendMenuIcon }}
          </v-icon>
        </template>
        <v-sheet class="pa-3">
          <b>
            {{ appendMenuText }}
          </b>
        </v-sheet>
      </v-menu>
    </w-text-field>
  </v-col>
</template>

<script>
export default {
  model: { prop: "value", event: "input" },
  props: {
    cols: { type: [Number, String] },
    md: { type: [String, Number], default: "" },
    offsetmd: { type: [String, Number] },
    picon: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "0",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    error: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: [Boolean, String],
      default: false,
    },
    rules: {
      type: [Array, String],
      default: () => [],
    },
    valueWhenIsEmpty: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: function () {
        return {
          prefix: "",
          suffix: "",
          precision: 0,
        };
      },
    },
    small: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "primary",
    },

    appendMenu: {
      type: Boolean,
      default: false,
    },
    appendMenuText: {
      type: String,
      default: "",
    },
    appendMenuIcon: {
      type: String,
      default: "",
    },
  },
  data: () => ({}),
  computed: {
    cmpValue: {
      get: function () {
        return this.value !== null && this.value !== ""
          ? this.humanFormat(this.value.toString())
          : this.valueWhenIsEmpty;
      },
      set: function (newValue) {
        this.$emit("input", this.machineFormat(newValue));
      },
    },
  },
  methods: {
    humanFormat: function (number) {
      if (isNaN(number)) {
        number = "";
      } else {
        number = Number(number).toLocaleString("en-US", {
          maximumFractionDigits: this.options.precision,
          minimumFractionDigits: this.options.precision,
        });
      }
      return number;
    },
    machineFormat(number) {
      if (number) {
        number = this.cleanNumber(number);
        number = number.padStart(parseInt(this.options.precision) + 1, "0");
        number =
          number.substring(
            0,
            number.length - parseInt(this.options.precision)
          ) +
          "." +
          number.substring(
            number.length - parseInt(this.options.precision),
            number.length
          );
        if (isNaN(number)) {
          number = this.valueWhenIsEmpty;
        }
      } else {
        number = this.valueWhenIsEmpty;
      }
      if (this.options.precision === 0) {
        number = this.cleanNumber(number);
      }
      return number;
    },
    keyPress($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
      if (this.targetLength()) {
        $event.preventDefault();
      }
    },

    cleanNumber: function (value) {
      let result = "";
      if (value) {
        let flag = false;
        let arrayValue = value.toString().split("");
        for (var i = 0; i < arrayValue.length; i++) {
          if (this.isInteger(arrayValue[i])) {
            if (!flag) {
              if (arrayValue[i] !== "0") {
                result = result + arrayValue[i];
                flag = true;
              }
            } else {
              result = result + arrayValue[i];
            }
          }
        }
      }
      return result;
    },
    isInteger(value) {
      let result = false;
      if (Number.isInteger(parseInt(value))) {
        result = true;
      }
      return result;
    },
    targetLength() {
      if (Number(this.cleanNumber(this.value).length) >= Number(50)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
