export default {
  data() {
    return {
      layer: {
        id: 'trailLayer',
        type: 'line',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-opacity': 0.65,
          'line-color': ['get', 'speed'],
          'line-width': 3,
        },
      },
    };
  },
  methods: {
    async fetchTrail(callsign) {
      const response = await fetch(`${process.env.VUE_APP_API_ADDRI}/geojsontrail/${callsign}`);
      const data = await response.json();
      const output = { source: data, layer: this.layer };
      this.$store.commit('SET_TRAIL_LAYER', output);
    },
  },
};
