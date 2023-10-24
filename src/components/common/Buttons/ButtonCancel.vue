<template>
  <v-col :cols="cols" :md="md" :sm="sm" :offset-md="offsetmd" class="text-end">
    <v-btn
      rounded
      outlined
      title=""
      :elevation="elevation"
      :block="block"
      :disabled="disabled"
      :loading="loading"
      @click="handleClick()"
    >
      <v-icon v-if="icon && iconalign === 'left'" small>
        {{ icon }}
      </v-icon>
      <v-spacer v-if="text && text != ''"></v-spacer>
      <span v-if="text && text != ''">{{ text }}</span>
      <v-spacer v-if="text && text != ''"></v-spacer>
      <v-icon v-if="icon && iconalign === 'right'" small>
        {{ icon }}
      </v-icon>
    </v-btn>
  </v-col>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "CANCELAR",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    iconalign: {
      type: String,
      default: "right",
    },
    tooltip: {
      type: String,
      default: "",
    },

    cols: {
      type: [String, Number],
      default: "0",
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
    block: {
      type: Boolean,
      default: true,
    },
    elevation: {
      type: [String, Number],
      default: 0,
    },
  },

  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style>
</style>