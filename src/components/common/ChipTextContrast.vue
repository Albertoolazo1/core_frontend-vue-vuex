<template>
  <v-chip
    active-class="darken-4"
    :value="value"
    :class="textColor"
    :color="color"
    :small="small"
    :large="large"
  >
    <slot></slot>
  </v-chip>
</template>

<script>
import { getContrastColor } from "../../_helpers";
export default {
  props: {
    value: {
      type: [Number, String],
    },
    text: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    small: {
      type: Boolean,
      default: true,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    textColor() {
      const contrastColor =
        this.color && this.color != "" ? getContrastColor(this.color) : "";
      return ` ${contrastColor}--text`;
    },
  },
};
</script>

<style>
</style>