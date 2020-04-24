export default {
  SET_MAP: (state, data) => state.map = data,
  SET_MAP_STATUS: (state, data) => state.mapLoaded = data,
  SET_SIDEBAR_CONTENT: (state, data) => state.sidebarContent = data,
  SET_TRAIL_LAYER: (state, data) => state.trailLayer = data,
  SET_PILOTS_DATA: (state, data) => state.pilotsData = { ...data },
  SET_AIRPORTS_DATA: (state, data) => state.airportsData = data,
  SET_OPTIONS: (state, data) => state.options = data,
  SET_LAYER: (state, data) => {
    if (!state.listOfLayers.includes(data)) state.listOfLayers.push(data);
  },
  REMOVE_LAYER: (state, data) => {
    const index = state.listOfLayers.indexOf(data);
    state.listOfLayers.splice(index);
  },
};
