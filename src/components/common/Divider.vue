<template>
  <v-col :cols="cols" :md="md" :sm="sm" :offset-md="offsetmd">
    <v-divider :class="color"></v-divider>
  </v-col>
</template>

<script>
export default {
  props: {
    cols: {
      type: [String, Number],
      default: "12",
    },
    md: {
      type: [String, Number],
      default: "0",
    },
    sm: {
      type: [String, Number],
      default: "0",
    },
    offsetmd: {
      type: [String, Number],
      default: "0",
    },
    color: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style>
</style>