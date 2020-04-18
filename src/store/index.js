import Vue from 'vue';
import Vuex from 'vuex';
import { saveStatePlugin } from './plugins';
import mutations from './mutations';
import defaultOptions from './defaultOptions';

Vue.use(Vuex);

const option = JSON.parse(localStorage.getItem('options')) || defaultOptions;

const store = new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    options: option,
    map: {},
    mapLoaded: false,
    trailLayer: null,
    pilotsData: {},
    airportsData: {},
    sidebarContent: null,
    layersAndSources: [],
    listOfLayers: [],
  },
  mutations,
  actions: {
  },
  modules: {
  },
});

export default store;
