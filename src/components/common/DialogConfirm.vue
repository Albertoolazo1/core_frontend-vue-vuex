<template>
  <v-dialog v-model="showDialog" max-width="650px" persistent>
    <v-card rounded="xl">
      <v-card-title class="text-subtitle-1"> Confirmar </v-card-title>
      <v-card-text> {{ text }} </v-card-text>
      <slot></slot>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" outlined rounded @click="cancel">
          Cancelar
        </v-btn>
        <v-btn
          color="secondary"
          rounded
          :disabled="disabled"
          :loading="loading"
          @click="confirm"
          >Aceptar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    text: { type: String, default: "¿Esta seguro de realizar la operación?" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
  watch: {
    show(val) {
      this.showDialog = val;
      if (!val) {
        this.$emit("setShowDialog", val);
      }
    },
  },
};
</script>

<style>
</style>