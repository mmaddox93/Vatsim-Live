<template>
  <div v-if="this.$store.state.airportsData.data">
    <MglLayer :source="this.$store.state.airportsData" :layer="geojsonLayer" />
  </div>
</template>

<script>
import MglLayer from '@/components/MapComponents/MglLayer';

export default {
  components: { MglLayer },
  data() {
    return {
      geojsonLayer: {
        id: 'airportIcon',
        type: 'circle',
        paint: {
          'circle-radius': {
            stops: [
              [5, 5],
              [15, 50],
            ],
            base: 2,
          },
          'circle-opacity': 0.5,
          'circle-color': 'red',
          'circle-stroke-color': 'red',
          'circle-stroke-width': 1,
        },
      },

    };
  },
};
</script>
