import Vue from 'vue';
import Vuex from 'vuex';

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
    sidebarContent: null,
    trailLayer: null,
    layersAndSources: [],
    listOfLayers: [],
    mapLoaded: false,
  },
  mutations: {
    changeMap(state, data) {
      state.map = data;
    },
    changeMapStatus(state, data) {
      state.mapLoaded = data;
    },
    setSideBarContent(state, data) {
      state.sidebarContent = data;
    },
    addLayerToList(state, data) {
      if (!state.listOfLayers.includes(data)) state.listOfLayers.push(data);
    },
    removeLayerfromList(state, data) {
      const index = state.listOfLayers.indexOf(data);
      state.listOfLayers.splice(index);
    },
    setTrailLayer(state, data) {
      state.trailLayer = data;
    },
    setPilotsData(state, data) {
      state.pilotsData = data;
    },
    updateOptions(state, data) {
      state.options = data;
    },
  },
  actions: {
  },
  modules: {
  },
});
