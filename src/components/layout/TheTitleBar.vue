<template>
  <v-card elevation="0" rounded="xl" class="mb-5 pt-1">
    <v-row>
      <v-col v-if="title && title != ''" cols="12" class="mb-0 pb-0">
        <v-card-title class="font-weight-bold primary--text">
          {{ title }}
        </v-card-title>
        <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
      </v-col>
      <v-col cols="12" v-if="suggestionsEnabled" class="mt-0 pt-0">
        <v-card
          elevation="0"
          rounded="lg"
          color="transparent"
          class="horizontal-scroll"
        >
          <v-chip
            v-for="(item, i) in suggestions"
            :key="i"
            class="ma-2"
            link
            :to="item.src"
            active-class="secondary"
          >
            {{ item.title }}
          </v-chip>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "TitleBar",

  props: {
    title: { type: String, default: "" },
    subtitle: { type: String },

    suggestions: {
      type: Array,
    },
    suggestionsEnabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
/* Hide scrollbar for IE, Edge and Firefox */
.horizontal-scroll {
  overflow: auto;
  white-space: nowrap;
}

.horizontal-scroll::-webkit-scrollbar {
  height: 7px;
}

.horizontal-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.horizontal-scroll::-webkit-scrollbar-thumb {
  background-color: rgb(199, 198, 198);
  border-radius: 20px;
  border: 1px solid rgb(199, 198, 198);
}
</style>
