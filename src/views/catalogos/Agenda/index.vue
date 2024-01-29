<template>
  <v-container>
    <!--<c-the-title-bar
      title="Dias Festivos"
      :suggestions-enabled="true"
      :suggestions="suggestions"
    />

    <form-agregar-calendario />

   -->
    <table-calendars />
  </v-container>
</template>

<script>
/* import FormAgregarCalendario from "./components/FormAgregarCalendario.vue";
 */
import TableCalendars from "./components/TableCalendars.vue";

export default {
  components: {
    /* FormAgregarCalendario,
    , */
    TableCalendars,
  },
  data() {
    return {
      path: window.location.pathname.replaceAll("/", "-"),
      suggestions: [
        {
          title: "Calendarios",
          src: { name: "calendarios" },
        },
      ],
    };
  },
};
</script>

<style>
</style>