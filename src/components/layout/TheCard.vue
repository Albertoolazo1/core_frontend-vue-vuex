<template>
  <v-row dense>
    <v-col cols="12" md="12">
      <v-card
        v-if="enableEventClick"
        :class="
          level === '1'
            ? 'my-3 v-the-card'
            : 'custom_background my-3  v-the-card'
        "
        :elevation="!hover ? elevation : ''"
        rounded="xl"
        color="transparent"
        :disabled="disabled"
        :loading="loading"
        :hover="hover"
        :max-width="maxHeight"
        @click="onClick"
      >
        <v-app-bar
          v-if="((title && title != '') || botonCerrar) && !hide"
          flat
          height="40vh"
          class=""
        >
          <h2>{{ title }}</h2>
          <v-spacer></v-spacer>
          <v-tooltip v-if="botonCerrar" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon @click="eventCerrar()">
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>Cerrar</span>
          </v-tooltip>
        </v-app-bar>

        <v-app-bar v-if="hide" flat height="40vh" class="">
          <h2>{{ title }}</h2>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon @click="eventOcultar()">
                <v-icon v-if="!isHidden">mdi-chevron-up</v-icon>
                <v-icon v-else>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <span>Mostrar/Ocultar</span>
          </v-tooltip>
        </v-app-bar>

        <div
          v-if="!isHidden"
          :style="attrs.styleContent"
          class="rounded-xl"
          :class="[
            {
              'rounded-t-0':
                hide || (((title && title != '') || botonCerrar) && !hide),
            },
            contentClass,
          ]"
        >
          <slot></slot>
        </div>
      </v-card>

      <v-card
        v-else
        :class="level === '1' ? 'my-3 mx-3' : 'custom_background my-3 mx-3'"
        :elevation="!hover ? elevation : ''"
        rounded="xl"
        :disabled="disabled"
        :loading="loading"
        :hover="hover"
      >
        <v-app-bar
          v-if="((title && title != '') || botonCerrar) && !hide"
          flat
          height="40vh"
          class=""
        >
          <h2>{{ title }}</h2>
          <v-spacer></v-spacer>
          <v-tooltip v-if="botonCerrar" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon @click="eventCerrar()">
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>Cerrar</span>
          </v-tooltip>
        </v-app-bar>

        <v-app-bar v-if="hide" flat height="40vh" class="">
          <h2>{{ title }}</h2>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon @click="eventOcultar()">
                <v-icon v-if="!isHidden">mdi-chevron-down</v-icon>
                <v-icon v-else>mdi-chevron-up</v-icon>
              </v-btn>
            </template>
            <span>Mostrar/Ocultar</span>
          </v-tooltip>
        </v-app-bar>

        <div
          v-if="!isHidden"
          class="rounded-xl"
          :style="attrs.styleContent"
          :class="[
            {
              'rounded-t-0': hide,
            },
            contentClass,
          ]"
        >
          <slot></slot>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, default: false },
    elevation: {
      type: Number,
      default: 3,
    },
    title: {
      type: String,
      default: "",
    },
    botonCerrar: {
      type: Boolean,
      default: false,
    },
    hover: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: Boolean,
      default: false,
    },
    disabled: { type: Boolean, default: false },
    level: {
      type: [String, Number],
      default: "1",
    },
    enableEventClick: {
      type: Boolean,
      default: false,
    },
    contentClass: {
      type: String,
      default: "",
    },
    maxHeight: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      isHidden: false,
    };
  },
  computed: {
    attrs() {
      return this.$attrs;
    },
  },

  methods: {
    eventCerrar() {
      this.$emit("cerrar");
    },
    eventOcultar() {
      this.isHidden = !this.isHidden;
    },
    onClick() {
      if (!this.disabled) {
        this.$emit("click");
      }
    },
  },
};
</script>

<style scoped>
.v-card--link:before {
  background: none;
  border-radius: 25px !important;
}
.v-sheet.v-card--hover:hover {
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 5px 1px rgb(0 0 0 / 14%), 0px 3px 5px 2px rgb(0 0 0 / 12%) !important;
}
</style>