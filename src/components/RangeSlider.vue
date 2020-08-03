<template>
  <v-card flat color="transparent">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="overline text-left"
          >Points Range</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>

    <v-row>
      <v-col cols="12" sm="6">
        <br />
        <v-range-slider
          color="#aa96bb"
          v-model="value"
          max="20"
          thumb-label="always"
        >
          <template v-slot:thumb-label="{ value }">
            {{ value }}
          </template>
        </v-range-slider>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      value: [1, 6],
    };
  },
};
</script>
