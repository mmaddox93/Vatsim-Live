export default {
  data() {
    return {
      numberOfTimesMapUpdated: 0,
    };
  },
  methods: {
    saveSession() {
      this.$store.state.map.on('move', () => this.getInfo());
    },
    getInfo() {
      this.numberOfTimesMapUpdated++;
      if (this.numberOfTimesMapUpdated % 20 === 0) {
        const center = this.$store.state.map.getCenter();
        const zoom = this.$store.state.map.getZoom();
        localStorage.mapCenter = [center.lng, center.lat];
        localStorage.zoom = zoom;
      }
    },
  },
};
