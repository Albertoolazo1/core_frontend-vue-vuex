<template>
  <v-col
    :cols="cols"
    :xl="xl"
    :md="md"
    :sm="sm"
    :xs="xs"
    :offset-md="offsetmd"
    :offset-sm="offsetsm"
    class="text-truncate"
  >
    <slot name="topContent"> </slot>
    <span
      :class="{
        'text-caption': caption,
      }"
    >
      <span
        class="font-weight-bold"
        :class="classTitle?.length > 0 && classTitle"
      >
        {{ title }}
      </span>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on" :class="classText">
            {{ defaultValue }}
          </span>
        </template>
        {{ defaultValue }}
      </v-tooltip>
    </span>
    <c-button-clipboard v-if="clipBoard" :value="text" />
    <slot name="bottomContent" :color="color"> </slot>
  </v-col>
</template>

<script>
export default {
  props: {
    cols: { type: [String, Number] },
    xl: { type: [String, Number] },
    md: { type: [String, Number] },
    sm: { type: [String, Number] },
    xs: { type: [String, Number] },
    offsetmd: { type: [String, Number] },
    offsetsm: { type: [String, Number] },
    title: { type: String, default: "" },
    text: { type: [String, Number], default: "" },
    classTitle: { type: String, default: "" },
    classText: { type: String, default: "" },
    defaultText: { type: String, default: "N/A" },
    currencyFormat: { type: Boolean, default: false },
    color: { type: String, default: "" },
    clipBoard: { type: Boolean, default: false },
    caption: { type: Boolean, default: true },
  },
  computed: {
    defaultValue() {
      return this.text ? this.text : this.defaultText;
    },
  },
};
</script>

<style>
.text-truncate {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>