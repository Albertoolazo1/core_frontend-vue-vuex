<template>
  <v-sheet color="transparent" :width="size">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.084 32.568">
      <g id="icon-numero-magico" transform="translate(0 -3)">
        <g id="Group_8" data-name="Group 8" transform="translate(0 3)">
          <path
            id="Path_132"
            data-name="Path 132"
            d="M16.284,3a3.758,3.758,0,0,0-3.758,3.758V8.01H3.758A3.758,3.758,0,0,0,0,11.768V31.81a3.758,3.758,0,0,0,3.758,3.758H36.326a3.758,3.758,0,0,0,3.758-3.758V11.768A3.758,3.758,0,0,0,36.326,8.01H27.557V6.758A3.758,3.758,0,0,0,23.8,3Zm0,2.505H23.8a1.253,1.253,0,0,1,1.253,1.253V8.01H15.031V6.758A1.253,1.253,0,0,1,16.284,5.505Zm4.725,17.321,16.57-4.417v13.4a1.253,1.253,0,0,1-1.253,1.253H3.758A1.253,1.253,0,0,1,2.505,31.81v-13.4l16.57,4.419a3.758,3.758,0,0,0,1.934,0ZM3.758,10.516H36.326a1.253,1.253,0,0,1,1.253,1.253v4.048l-17.213,4.59a1.253,1.253,0,0,1-.646,0L2.505,15.817V11.768a1.253,1.253,0,0,1,1.253-1.253Z"
            transform="translate(0 -3)"
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