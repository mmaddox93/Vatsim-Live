<template>
  <div v-if="$store.state.options.sigmets">
    <MglLayer v-if="geojson.data.id" :source="geojson" :layer="sigmetFill" />
    <MglLayer v-if="geojson.data.id" :source="geojson" :layer="sigmetBorder" />
  </div>
</template>

<script>
import MglLayer from '@/components/MapComponents/MglLayer';

export default {
  components: { MglLayer },
  data() {
    return {
      geojson: {
        type: 'geojson',
        cluster: false,
        data: {},
      },
      sigmetBorder: {
        id: 'center_atc_border',
        type: 'line',
        source: 'sigmetBounds',
        paint: {
          'line-width': 2,
          'line-color': '#0080ff',
          'line-opacity': 1,
        },
      },
      sigmetFill: {
        id: 'sigmetAtc',
        type: 'fill',
        source: 'sigmets',
        paint: {
          'fill-color': '#0080ff',
          'fill-opacity': 0.1,
        },
      },
    };
  },
  created() {
    this.initSigmets();
    this.addClickListeners();
  },
  methods: {
    async initSigmets() {
      const response = await fetch('https://map-dev.vatsim.net/sigmet/');
      const data = await response.json();
      data.id = 'sigmets';
      this.geojson.data = data;
    },
    addClickListeners() {
      this.$store.state.map.on('click', 'sigmetAtc', (e) => console.log(e.features[0]));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
