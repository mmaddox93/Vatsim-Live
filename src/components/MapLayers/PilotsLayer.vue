<template>
  <div>
    <MglImage url="https://i.imgur.com/4Lhn9MY.png" id="airplaneIcon" />
    <MglGeojsonLayer :source="geojson" :layer="layer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MglGeojsonLayer from '@/components/MapComponents/MglGeojsonLayer';
import MglImage from '@/components/MapComponents/MglImage';
import { PilotsGeojson } from '@/types/PilotGeojson';
import { makeInjector } from '@/helpers/inject';

const radius = 6371000;
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
const toDegrees = (radians: number) => (radians * 180) / Math.PI;
const sleep = (delay: number) => new Promise((resolve) => { setTimeout(resolve, delay); });

const collectionPropInjector = makeInjector<{ map: mapboxgl.Map }>();

export default collectionPropInjector(Vue, ['map']).extend({
  inject: ['map'],
  components: { MglGeojsonLayer, MglImage },
  data() {
    return {
      geojson: {} as PilotsGeojson,
      layer: {
        id: 'pilotsLayer',
        type: 'symbol',
        source: 'pilots',
        layout: {
          'icon-allow-overlap': true,
          'icon-image': 'airplaneIcon',
          'icon-size': 0.35,
          'icon-rotate': ['get', 'heading'],
          'icon-rotation-alignment': 'map',
        },
      },
    };
  },
  async mounted() {
    this.initPilots();
    setInterval(() => this.initPilots(), 15000);
    for (;; await sleep(500)) {
      if (this.geojson.data) this.predictiveRender();
    }
  },
  methods: {
    async initPilots() {
      const response = await fetch('https://map-dev.vatsim.net/api/v1/online/pilots');
      const data = await response.json();
      this.geojson = data;
    },
    // eslint-disable-next-line max-len
    destinationFix(latitude: number, longitude: number, distance: number, heading: number, altitude: number): [number, number, number] {
      const DELTA = distance / radius;
      const THETA = toRadians(heading);
      const PHI = toRadians(latitude);
      const LAMBDA = toRadians(longitude);

      const newLat = Math.asin(
        Math.sin(PHI) * Math.cos(DELTA)
        + Math.cos(PHI) * Math.sin(DELTA) * Math.cos(THETA),
      );

      const newLng = LAMBDA + Math.atan2(
        Math.sin(THETA) * Math.sin(DELTA) * Math.cos(PHI),
        Math.cos(DELTA) - Math.sin(PHI) * Math.sin(newLat),
      );

      const lat: number = toDegrees(newLat);
      const lng: number = toDegrees(newLng);
      return [lng, lat, altitude];
    },
    predictiveRender() {
      const updatedPilots = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const pilot of this.geojson.data.features) {
        const UPDATE_FREQ: number = 0.5;
        const LONG = pilot.geometry.coordinates[0];
        const LAT = pilot.geometry.coordinates[1];
        const ALT = pilot.geometry.coordinates[2];
        const HDG = pilot.properties.heading;
        const SPEED = pilot.properties.groundspeed;
        const DISTANCE = (SPEED / 3600) * 1852 * UPDATE_FREQ;

        const newPilot = {
          ...pilot,
          geometry: {
            type: 'Point',
            coordinates: this.destinationFix(LAT, LONG, DISTANCE, HDG, ALT),
          },
        };
        updatedPilots.push(newPilot);
      }
      this.geojson.data.features = updatedPilots;
    },
  },
});
</script>
