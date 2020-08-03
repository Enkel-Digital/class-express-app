<template>
  <v-card flat>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="overline text-left"
          >distance</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>

    <v-row>
      <v-col cols="12" sm="6">
        <br />

        <v-slider color="#aa96bb" v-model="slider" thumb-label="always"
          ><template v-slot:thumb-label="{ value }">
            {{ value + "km" }}
          </template></v-slider
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      slider: 45,
    };
  },
};
</script>
