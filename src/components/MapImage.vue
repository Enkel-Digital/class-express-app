<template>
  <!--
    - Using the aspect-ratio attribute to "reserve" an empty space of that dimension to prevent "jumpy UI" when image is loaded after being scrolled to
    - aspect ratio is derived from "600/300", which is the size of map image requested for via the API
    - eager attribute can also be used to make image load before scrolled to
  -->
  <!-- @todo Cache image either locally on the client or on our own CDN instead of always hitting google's server -->
  <v-img aspect-ratio="2" :src="locationImage" @click="openMaps" />
</template>

<script>
import createGMapsImg from "../utils/gMapsImage";

/**
 * @todo Optimize usage of props. Perhaps can do away with src and use classID to get src if not provided.
 * @todo Handle opening maps to native apps like Google Maps or Apple maps.
 */

export default {
  name: "gMap",
  props: ["src", "classID", "partnerID"],
  computed: {
    clas() {
      return this.$store.state.classes.classes[this.classID];
    },
    partner() {
      return this.$store.state.classes.partners[this.partnerID];
    },
    coordinates() {
      // If image src is specified, ignore coordinates calculation
      if (this.src) return;

      // If the map image for a class is requested, check if there is a custom class location else use partner's location
      // null coalescing to protect against undefined if clas or partner object is not loaded yet.
      if (this.clas)
        return (
          this.clas?.location_coordinates ||
          this.$store.state.classes.partners[this.clas.partnerID]
            ?.location_coordinates
        );
      else if (this.partner) return this.partner?.location_coordinates;
      else return undefined; // If neither clas nor partner is loaded yet, return nothing first
    },
    locationImage() {
      // Only if src is not specified, create the image source link
      if (!this.src) {
        // Coordinates may not be calculated finish before this property is triggered
        if (!this.coordinates) return;
        else return createGMapsImg(this.coordinates);
      } else return this.src;
    },
  },
  methods: {
    openMaps() {
      if (confirm("Open Maps?"))
        // @todo This target _blank seems to still not work in PWAs? Why?
        window.open(
          `https://www.google.com/maps/search/${this.coordinates}?hl=en`,
          "_blank"
        );
    },
  },
};
</script>
