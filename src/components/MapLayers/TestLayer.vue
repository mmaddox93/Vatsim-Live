<template>
  <MglGeojsonLayer :source="geojson" :layer="layer" />
</template>

<script lang="ts">
import Vue from 'vue';
import MglGeojsonLayer from '@/components/MapComponents/MglGeojsonLayer';
import { makeInjector } from '@/helpers/inject';

const collectionPropInjector = makeInjector<{ map: mapboxgl.Map }>();

export default collectionPropInjector(Vue, ['map']).extend({
  inject: ['map'],
  components: { MglGeojsonLayer },
  data() {
    return {
      geojson: {
        type: 'geojson',
        cluster: false,
        data: {
          id: 'test',
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [-6.916667, 55.333333],
                    [-7.333333, 55.416667],
                    [-8.250000, 55.333333],
                    [-9.000000, 54.750000],
                    [-10.000000, 54.566667],
                    [-10.000000, 57.000000],
                    [-15.000000, 57.000000],
                    [-15.000000, 49.000000],
                    [-8.00000, 48.493611],
                    [-8.000000, 51.000000],
                    [-5.500000, 52.333333],
                    [-5.500000, 53.916667],
                    [-8.166667, 54.416667],
                    [-6.916667, 55.333333],
                  ],
                ],
              },
              properties: {
              },
            }],
        },
      },
      layer: {
        id: 'testLayer',
        source: 'test',
        type: 'fill',
        layout: {},
        paint: {
          'fill-outline-color': '#4347ff',
          'fill-color': '#4347ff',
          'fill-opacity': 0.3,
        },
      },
    };
  },
});
</script>
