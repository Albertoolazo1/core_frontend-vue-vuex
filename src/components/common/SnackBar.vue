<template>
  <v-snackbar
    v-model="showSnackBar"
    light
    rounded="xl"
    :timeout="timer != '0' && timer != '' ? timer : '-1'"
    elevation="10"
  >
    <div v-if="Array.isArray(text)" class="d-flex flex-column">
      <span v-for="(itemText, index) in text" :key="index">
        {{ itemText }}
      </span>
    </div>
    <span v-else class="text-subtitle-2">{{ text }}</span>

    <template v-slot:action="{ attrs }">
      <v-btn
        :color="type"
        v-bind="attrs"
        @click="showSnackBar = false"
        rounded
        class="text-caption"
      >
        <span v-if="type == 'success'">OK</span>
        <span v-else-if="type == 'warning'">ENTENDIDO</span>
        <span v-else>ACEPTAR</span>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    timer: { type: String, default: "5000" },
    text: { type: [String, Array] },
    type: { type: String },
  },
  data() {
    return {
      showSnackBar: false,
    };
  },
  watch: {
    show(v, val) {
      this.showSnackBar = val;
      if (!val && v) {
        this.$emit("setShowSnackBar", val);
      }
    },
  },
};
</script>

<style>
</style>