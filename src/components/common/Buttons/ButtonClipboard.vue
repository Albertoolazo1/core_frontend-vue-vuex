<template>
  <v-tooltip bottom close-delay="10">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="!text"
        v-bind="attrs"
        v-on="on"
        class="rounded-pill"
        small
        icon
        block
        @click.stop="copiarAlPortapapeles(value)"
      >
        <v-icon small>mdi-content-copy</v-icon>
      </v-btn>

      <v-btn
        v-if="text"
        v-bind="attrs"
        v-on="on"
        text
        block
        @click.stop="copiarAlPortapapeles(value)"
      >
        <b v-if="text" class="primary--text">
          {{ text }}
        </b>
      </v-btn>
    </template>
    <span>Copiar al portapapeles</span>
  </v-tooltip>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    text: {
      type: [String],
      default: "",
    },
  },

  methods: {
    ...mapActions({
      showAppMessage: "app/showAppMessage",
    }),

    copiarAlPortapapeles(value) {
      navigator.clipboard.writeText(value);

      this.showAppMessage({
        text: "Copiado en el portapapeles.",
        type: "success",
      });
    },
  },
};
</script>

<style>
</style>