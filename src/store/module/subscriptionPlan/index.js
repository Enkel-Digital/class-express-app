/**
 * Vuex module for the subscription plan view.
 *
 * @todo Remove this state from being cached by vuex-persistedstate
 */

import initialState from "./initialState";
import setter from "../../utils/setter";
import api from "@/store/utils/fetch";

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    setter
  },
  getters: {
    currentPlan(state) {
      return state.subscriptionPlans.find(
        plan => plan.id === state.currentPlanID
      );
    },
    nextPlan(state) {
      return state.subscriptionPlans.find(plan => plan.id === state.nextPlanID);
    }
  },
  actions: {
    /**
     * Initialization function for this module
     * @function init
     */
    async init({ dispatch }) {
      // @todo Only call when loading the subscriptionPlans view
      dispatch("getPlans");

      dispatch("getPlanIDs");
    },
    /**
     * Get list of available subscription plans from api
     * @function getPlans
     */
    async getPlans({ commit }) {
      const response = await api.get("/subscription/plans/all");
      if (!response.success); // @todo Handle error

      commit("setter", ["subscriptionPlans", response.subscriptionPlans]);
    },
    /**
     * Get ID of current plan
     * @function getPlans
     */
    async getPlanIDs({ commit, rootState }) {
      const response = await api.get(`/subscription/${rootState.user.email}`);
      if (!response.success); // @todo Handle error

      commit("setter", ["currentPlanID", response.plans.currentPlanID]);
      commit("setter", ["nextPlanID", response.plans.nextPlanID]);
    },
    /**
     * Update the user's plan
     * @function updatePlan
     */
    async updatePlan({ state, commit, rootState }, planID) {
      // If user selects own plan, ignore selection
      if (state.nextPlanID === planID) return;

      if (confirm("Confirm change of Subscription Plan!")) {
        // @todo Show loading bar before calling API for pessimistic UI

        // Call API to update the plan
        const response = await api.post("/subscription/plans/update", {
          userID: rootState.user.email,
          subscriptionPlanID: planID
        });

        // @todo Remove before beta
        console.log("Plan is updated");

        // Pessimistic UI, show after network update is complete, using the users' plans the API returned
        commit("setter", ["currentPlanID", response.plans.currentPlanID]);
        commit("setter", ["nextPlanID", response.plans.nextPlanID]);
      }
    },
    async cancelPlan({ rootState, commit }, cancellationReasons) {
      const response = await api.post("/subscription/cancel", {
        userID: rootState.user.userID,
        cancellationReasons
      });

      // @todo
      if (response.success) {
        // Indicate that this is the last plan and there will no longer be any next plan
        commit("setter", ["nextPlanID", null]);
      } else {
        // error dialog
      }
    }
  }
};
