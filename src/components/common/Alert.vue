<template>
  <v-row dense class="row-alert" no-gutters>
    <v-col cols="12">
      <h4 class="title-text">{{ title }}</h4>
      <p class="body-text">{{ body }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    title: String,
    body: String,
  },
};
</script>

<style>
.row-alert {
  max-width: 30vh;
  margin-left: 5px !important;
  margin-right: 5px !important;
}
.title-text {
  color: white;
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 5x;
}
.body-text {
  color: rgb(228, 228, 228);
  font-weight: normal;
  font-size: 14px;
}
</style>