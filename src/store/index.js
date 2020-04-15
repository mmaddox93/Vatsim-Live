import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    options: {
      sigmets: false,
      aircraftLabels: false,
      weather: true,
    },
    map: {},
    pilotsData: {},
    airportsData: {},
    sidebarContent: null,
    trailLayer: null,
    layersAndSources: [],
    listOfLayers: [],
    mapLoaded: false,
  },
  mutations,
  actions: {
  },
  modules: {
  },
});
