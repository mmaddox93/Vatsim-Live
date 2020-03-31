<template>
  <div>
    <MglLayer v-if="geojson.type" :source="geojson" :layer="onlineBorder" />
    <MglLayer v-if="geojson.type" :source="geojson" :layer="onlineFill" />
  </div>
</template>

<script>
// not currently in use
import MglLayer from '@/components/MapComponents/MglLayer';

export default {
  components: { MglLayer },
  data() {
    return {
      geojson: {},
      onlineBorder: {
        id: 'center_atc_border',
        type: 'line',
        source: 'onlineFirBounds',
        paint: {
          'line-width': 2,
          'line-color': '#ffffff',
          'line-opacity': 1,
          'line-dasharray': [2, 4],
        },
      },
      onlineFill: {
        id: 'center_atc',
        type: 'fill',
        source: 'onlineFirBounds',
        paint: {
          'fill-color': 'grey',
          'fill-opacity': 0.2,
        },
      },
    };
  },
  created() {
    this.initCenters();
  },
  methods: {
    async initCenters() {
      const response = await fetch(`${process.env.VUE_APP_API_ADDRI}/centresgeojson`);
      const data = await response.json();
      this.geojson = data;
    },
  },
};

</script>
