<template>
  <v-sheet color="transparent" :width="size">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.502 33.002">
      <g id="icon-patrimonio" transform="translate(-1.498 -5.998)">
        <g id="Group_7" data-name="Group 7">
          <path
            id="Path_131"
            data-name="Path 131"
            d="M10.5,37.5a1.5,1.5,0,0,1-3,0V11.121L4.062,14.562a1.5,1.5,0,1,1-2.124-2.124l6-6,.021-.021a1.494,1.494,0,0,1,2.1.018l6,6a1.5,1.5,0,1,1-2.121,2.124L10.5,11.121ZM21,10.5A1.5,1.5,0,0,1,22.5,9h21a1.5,1.5,0,0,1,0,3h-21A1.5,1.5,0,0,1,21,10.5ZM22.5,18a1.5,1.5,0,0,0,0,3h15a1.5,1.5,0,0,0,0-3Zm0,9a1.5,1.5,0,0,0,0,3h9a1.5,1.5,0,0,0,0-3Zm0,9a1.5,1.5,0,0,0,0,3h3a1.5,1.5,0,0,0,0-3Z"
            :fill="colores[0]"
          />
        </g>
      </g>
    </svg>
  </v-sheet>
</template>
  
  <script>
export default {
  props: {
    colores: {
      type: Array,
      default() {
        return [];
      },
    },
    size: {
      type: Number,
      default: 30,
    },
  },
};
</script>
  
  <style>
</style>