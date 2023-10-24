<template>
  <div class="mt-1">
    <h2 class="font-weight-bold">
      <v-icon color="primary">mdi-clock</v-icon>
      <span> {{ fecha + " | " + hora }}</span>
    </h2>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getFechaActual } from "../../_helpers";
export default {
  mounted() {
    var _this = this;
    window.setInterval(function () {
      _this.hora = getFechaActual(true).split(" ")[1];
      _this.changeAppTime(getFechaActual(true));
    }, 1000);
  },

  data() {
    return {
      hora: "00:00",
      fecha: getFechaActual(false),
    };
  },

  computed: {},

  methods: {
    ...mapActions({
      changeAppTime: "app/changeAppTime",
    }),
  },

  watch: {},
};
</script>

<style>
</style>