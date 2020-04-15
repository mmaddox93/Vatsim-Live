export default {
  changeMap: (state, data) => state.map = data,
  changeMapStatus: (state, data) => state.mapLoaded = data,
  setSideBarContent: (state, data) => state.sidebarContent = data,
  setTrailLayer: (state, data) => state.trailLayer = data,
  setPilotsData: (state, data) => state.pilotsData = data,
  setAirportsData: (state, data) => state.airportsData = data,
  updateOptions: (state, data) => state.options = data,
  addLayerToList: (state, data) => {
    if (!state.listOfLayers.includes(data)) state.listOfLayers.push(data);
  },
  removeLayerfromList(state, data) {
    const index = state.listOfLayers.indexOf(data);
    state.listOfLayers.splice(index);
  },
};
