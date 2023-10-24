<template>
  <v-sheet color="transparent" :width="size">
    <svg
      id="icon-ahorros"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 33.002 33.002"
    >
      <g id="Group_12" data-name="Group 12">
        <path
          id="Path_141"
          data-name="Path 141"
          d="M9.364.3a1.031,1.031,0,0,1,.728-.3H22.91a1.031,1.031,0,0,1,.728.3L32.7,9.364a1.031,1.031,0,0,1,.3.728V22.91a1.031,1.031,0,0,1-.3.728L23.638,32.7a1.031,1.031,0,0,1-.728.3H10.092a1.031,1.031,0,0,1-.728-.3L.3,23.638A1.031,1.031,0,0,1,0,22.91V10.092a1.031,1.031,0,0,1,.3-.728Zm1.155,1.761L2.063,10.519V22.483l8.457,8.457H22.483l8.457-8.457V10.519L22.483,2.063Z"
          :fill="colores[0]"
        />
        <path
          id="Path_142"
          data-name="Path 142"
          d="M63.018,50.4a2.063,2.063,0,1,1,2.063,2.063A2.063,2.063,0,0,1,63.018,50.4Zm.2-12.386a1.867,1.867,0,1,1,3.713,0l-.722,7.234a1.139,1.139,0,0,1-2.269,0Z"
          transform="translate(-48.575 -27.715)"
          :fill="colores[1]"
        />
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