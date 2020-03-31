<script>
export default {
  render: () => null,
  async mounted() {
    this.addRainfall();
  },
  beforeDestroy() {
    this.$store.state.map.removeLayer('rainviewer');
    this.$store.state.map.removeSource('rainviewer');
  },
  methods: {
    async addRainfall() {
      const response = await fetch('https://tilecache.rainviewer.com/api/maps.json');
      const data = await response.json();
      const timestamp = data[data.length - 1];

      await this.$store.state.map.addLayer({
        id: 'rainviewer',
        type: 'raster',
        source: {
          type: 'raster',
          tiles: [
            `https://tilecache.rainviewer.com/v2/radar/${timestamp}/512/{z}/{x}/{y}/4/0_0.png`,
          ],
          tileSize: 512,
        },
        minzoom: 0,
        maxzoom: 12,
        paint: {
          'raster-opacity': 0.4,
        },
      });
    },
  },
};
</script>
