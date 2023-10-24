<template>
  <v-row dense>
    <v-col cols="12">
      <v-expansion-panels class="rounded-xl" v-model="panel" multiple>
        <v-expansion-panel key="0" class="rounded-xl">
          <v-expansion-panel-header class="background_expandable rounded-xl">
            <h6>{{ title }}</h6>
            {{ extraTitle }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pt-4">
            <slot></slot>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    value: {
      type: [String, Array, Number],
      default: function () {
        return [0];
      },
    },
    extraTitle: {
      type: String,
      default: "",
    },
  },
  computed: {
    panel: {
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