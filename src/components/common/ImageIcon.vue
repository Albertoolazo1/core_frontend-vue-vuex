<template>
  <v-img :src="imgsrc" max-width="30" contain height="25" />
</template>

<script>
export default {
  props: {
    imgsrc: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>