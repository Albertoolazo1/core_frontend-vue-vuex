<template>
  <v-sheet color="transparent" :width="size">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.6 38.133">
      <g id="icon-introduccion" transform="translate(-6)">
        <g id="Group_6" data-name="Group 6" transform="translate(6)">
          <path
            id="Path_129"
            data-name="Path 129"
            d="M18.575,6a1.192,1.192,0,0,0,0,2.383h7.15a1.192,1.192,0,0,0,0-2.383ZM29.3,20.3a7.15,7.15,0,1,1-7.15-7.15A7.15,7.15,0,0,1,29.3,20.3Z"
            transform="translate(-7.85 -1.233)"
            :fill="colores[0]"
          />
          <path
            id="Path_130"
            data-name="Path 130"
            d="M11.958,0A5.958,5.958,0,0,0,6,5.958V33.367a4.767,4.767,0,0,0,4.767,4.767H29.833A4.767,4.767,0,0,0,34.6,33.367V5.958A5.958,5.958,0,0,0,28.642,0ZM8.383,5.958a3.575,3.575,0,0,1,3.575-3.575H28.642a3.575,3.575,0,0,1,3.575,3.575V31.686a10.01,10.01,0,0,0-1.849-1.173C28.384,29.522,25.217,28.6,20.3,28.6s-8.084.922-10.067,1.914a10.01,10.01,0,0,0-1.849,1.173Z"
            transform="translate(-6)"
            :fill="colores[1]"
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