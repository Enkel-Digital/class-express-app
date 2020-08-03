<template>
  <div class="text-center">
    <v-dialog
      v-model="menu"
      fullscreen
      overlay-color="#d7d7d7"
      transition="dialog-bottom-transition"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn color="indigo" dark v-on="on">
          <v-icon left>mdi-filter</v-icon>
          Filter
        </v-btn>
      </template>

      <v-content>
        <v-card flat color="#d7d7d7">
          <v-app-bar app flat color="indigo" dark>
            <v-btn icon @click="menu = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>

            <v-toolbar-title class="overline text-center"
              >Filter
            </v-toolbar-title>
            <v-spacer />
            <v-btn color="white" class="overline" text @click="menu = false"
              >done</v-btn
            >
          </v-app-bar>

          <v-row dense>
            <v-col cols="12">
              <v-card dense class="class-card mx-auto" flat overlined>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="overline text-left"
                      >Categories</v-list-item-title
                    >

                    <ais-menu attribute="_tags">
                      <v-chip-group
                        column
                        active-class="deep-purple--text text--accent-4"
                        multiple
                        slot-scope="{ items, refine }"
                      >
                        <template v-for="item in items">
                          <v-chip
                            small
                            outlined
                            :key="item.value"
                            @click.prevent="refine(item.value)"
                          >
                            {{ item.label }}
                          </v-chip>
                        </template>
                        <!-- <li>
                <button :disabled="!canToggleShowMore" @click="toggleShowMore">
                  {{ isShowingMore ? "Less" : "More" }}
                </button>
              </li> -->
                      </v-chip-group>
                    </ais-menu>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card dense class="class-card mx-auto" flat overlined>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="overline text-left"
                      >Location</v-list-item-title
                    >

                    <v-chip-group
                      column
                      multiple
                      active-class="deep-purple--text text--accent-4"
                    >
                      <template v-for="item in locations">
                        <v-chip small outlined :key="item.text">{{
                          item.text
                        }}</v-chip>
                      </template>
                    </v-chip-group>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card dense class="class-card mx-auto" flat overlined>
                <Slider />
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card dense class="class-card mx-auto" flat overlined>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="overline text-left"
                      >Points</v-list-item-title
                    >

                    <v-chip-group
                      active-class="deep-purple--text text--accent-4"
                      column
                      multiple
                    >
                      <template v-for="item in points">
                        <v-chip small outlined :key="item.text">{{
                          item.text
                        }}</v-chip>
                      </template>
                    </v-chip-group>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card dense class="class-card mx-auto" flat overlined>
                <RangeSlider />
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-content>

      <!-- <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="message" color="purple"></v-switch>
          </v-list-item-action>
          <v-list-item-title>messages</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="hints" color="purple"></v-switch>
          </v-list-item-action>
          <v-list-item-title>hints</v-list-item-title>
        </v-list-item>
      </v-list> -->
    </v-dialog>
  </div>
</template>

<script>
import { AisMenu } from "vue-instantsearch";
import Slider from "../components/Slider";
import RangeSlider from "../components/RangeSlider";
export default {
  components: { AisMenu, Slider, RangeSlider },
  data: () => ({
    av: true,
    menu: false,
    message: false,
    hints: true,
    categories: [
      {
        text: "Business",
        icon: "mdi-handshake",
      },
      {
        text: "Arts & Media",
        icon: "mdi-music",
      },
      {
        text: "Healthcare",
        icon: "mdi-heart",
      },
      {
        text: "IT",
        icon: "mdi-book",
      },
      {
        text: "Sports",
        icon: "mdi-bike",
      },
    ],
    locations: [
      {
        text: "Bugis",
      },
      {
        text: "Orchard",
      },
      {
        text: "Tampines",
      },
      {
        text: "Expo",
      },
      {
        text: "Bedok",
      },
      {
        text: "Jurong East",
      },
      {
        text: "Woodlands",
      },
      {
        text: "City Hall",
      },
    ],
    points: [
      {
        text: "1 - 3",
      },
      {
        text: "3 - 5",
      },
      {
        text: "6 - 10",
      },
    ],
    loading: false,
    selected: [],
  }),
  computed: {
    allSelected() {
      return this.selected.length === this.categories.length;
    },

    selections() {
      const selections = [];
      for (const selection of this.selected) {
        selections.push(selection);
      }
      return selections;
    },
  },
};
</script>
<style scoped>
.class-card {
  border-radius: 0px;
}
</style>
