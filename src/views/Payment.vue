<template>
  <v-content class="payment">
    <v-app-bar app color="orange lighten-1" flat dark fixed>
      <BackBtn :to="{ name: 'subscription' }" />
      <v-toolbar-title>Payment</v-toolbar-title>
    </v-app-bar>

    <v-card
      id="payment-card"
      class="mx-auto mb-4"
      max-width="calc(100% - 3em)"
      outlined
    >
      <v-card-title>RETRIEVED_PRODUCT_NAME (PRICE)</v-card-title>
      <v-card-subtitle>RETRIEVED_PRODUCT_DESCRIPTION</v-card-subtitle>
      <div ref="card"></div>
      <v-card-actions>
        <v-btn onclick="purchase">Purchase</v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<style scoped></style>

<script>
import { Touch } from "vuetify/lib/directives";
import BackBtn from "@/components/BackBtn";

/* global Stripe */
let stripe = Stripe("pk_test_LIc2NCzFeOD5ng6VrGwNE8Dx00Z67P4mCD"),
  elements = stripe.elements(),
  card = undefined;

export default {
  name: "payment",
  directives: {
    Touch,
  },
  components: {
    BackBtn,
  },
  mounted: function () {
    card = elements.create("card");
    card.mount(this.$refs.card);
  },

  purchase: function () {
    let self = this;
    console.log("purchase_attempt");
    stripe.createToken(card).then(function (result) {
      if (result.error) {
        self.hasCardErrors = true;
        self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
        return;
      }
    });
  },
};
</script>
