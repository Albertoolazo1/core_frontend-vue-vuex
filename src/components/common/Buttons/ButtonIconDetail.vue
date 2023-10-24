<template>
  <span>
    <slot name="topContent" :dataSlot="dataSlot"> </slot>
    <v-tooltip :disabled="disabledTooltip" top>
      <template v-slot:activator="{ on, attrs }">
        <v-badge
          :content="contentValue"
          :value="cmpValue"
          :overlap="overlap"
          :top="top"
          :bottom="bottom"
          :left="left"
          :inline="inline"
          :color="colorValue"
          :class="blinker && 'blinker'"
          bordered
          depressed
        >
          <v-btn
            v-if="typeComponent == 'btn' || isContent"
            color="transparent"
            text
            class="px-0"
            min-width="30px"
            :disabled="disabled"
            v-on="on"
            v-bind="attrs"
            @click="onClickActions"
          >
            <slot name="content">
              <v-btn icon :loading="loading">
                <v-icon :color="iconColor" :small="small">
                  {{ icon }}
                </v-icon>
              </v-btn>
            </slot>
          </v-btn>
          <template> </template>
          <v-icon
            v-if="typeComponent == 'icon'"
            :color="iconColor"
            :small="small"
            v-on="on"
            v-bind="attrs"
            class="mx-1"
          >
            {{ icon }}
          </v-icon>
          <template v-slot:badge>
            <slot name="notification"> </slot>
          </template>
        </v-badge>
      </template>
      {{ tooltip }}
    </v-tooltip>
    <slot name="bottomContent" :dataSlot="dataSlot"> </slot>
  </span>
</template>
<script>
export default {
  props: {
    value: { type: [String, Number], default: 0 },
    icon: { type: String, default: "" },
    overlap: { type: Boolean, default: true },
    tooltip: { type: String, default: "" },
    dataSlot: { type: [Object, Function, String], default: "" },
    disabled: { type: Boolean, default: false },
    disabledTooltip: { type: Boolean, default: false },
    top: { type: Boolean, default: false },
    bottom: { type: Boolean, default: false },
    left: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    colorValue: { type: String, default: "success" },
    iconColor: { type: String, default: "" },
    blinker: { type: Boolean, default: false },
    inline: { type: Boolean, default: false },
    permitirVacios: { type: Boolean, default: false },
    typeComponent: { type: String, default: "btn" },
  },
  computed: {
    isCustom() {
      return this.$slots["notification"];
    },
    isContent() {
      return this.$slots["content"];
    },
    cmpValue() {
      return this.isCustom
        ? 1
        : this.permitirVacios
        ? String(this.value)
        : this.value;
    },
    contentValue() {
      return this.permitirVacios ? String(this.value) : this.value;
    },
  },
  methods: {
    onClickActions() {
      this.$emit("onClick");
    },
  },
};
</script>
<style>
.blinker .v-badge__badge {
  animation-name: blinker;
  animation-duration: 1.8s;
  animation-timing-function: 6;
  animation-iteration-count: infinite;
}
@keyframes blinker {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
  100% {
    opacity: 1;
  }
}
.content_icon_detail {
  width: fit-content;
  max-width: min-content;
}
</style>