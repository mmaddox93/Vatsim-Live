<template>
  <div v-if="geojson.type">
    <div v-if="$store.state.options.map.labels">
      <MglLayer :source="geojson" :layer="geojsonTextLayer" />
    </div>
    <MglLayer :source="geojson" :layer="geojsonLayer" />
  </div>
</template>

<script>
import MglLayer from '@/components/MapComponents/MglLayer';
import PredictiveRender from '@/mixins/PredictiveRender';

export default {
  components: {
    MglLayer,
  },
  mixins: [PredictiveRender],
  data() {
    return {
      lastFetch: {},
      predictiveSource: {},
      geojson: {},
      geojsonLayer: {
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
      geojsonTextLayer: {
        id: 'pilotsTextLayer',
        type: 'symbol',
        source: 'pilots',
        layout: {
          'text-allow-overlap': true,
          'text-field': ['get', 'callsign'],
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Regular'],
          'text-offset': [0, +1.25],
          'text-size': 12,
        },
        paint: {
          'text-color': '#4eac37',
          'text-halo-color': '#000000',
          'text-halo-width': 1,
        },
      },
    };
  },
  mounted() {
    this.initPilots();
    // this.addClickListeners();
    // this.addPopup();
    // this is a mem leak that needs fixing
    // setInterval(() => {
    //   this.updatePilots();
    // }, 15000);

    setInterval(() => {
      const mapZoom = this.$store.state.map.getZoom();
      if (this.predictiveSource.data && mapZoom > 6.5) this.predictiveRender();
    }, 500);
  },
  methods: {
    async fetchPilots() {
      const response = await fetch('https://map-dev.vatsim.net/api/v1/online/pilots');
      const data = await response.json();
      return data;
    },
    async updatePilots() {
      // eslint-disable-next-line no-unused-vars
      const newData = await this.fetchPilots();
      this.$store.commit('SET_PILOTS_DATA', newData);
      this.predictiveSource = newData;
      const source = this.$store.state.map.getSource('pilots');
      if (source) source.setData(newData.data);
    },
    async initPilots() {
      const newData = await this.fetchPilots();
      this.$store.commit('SET_PILOTS_DATA', newData);
      this.geojson = newData;
      this.lastFetch = newData;
      this.predictiveSource = newData;
    },
    addClickListeners() {
      this.$store.state.map.on('click', 'pilotsLayer', (e) => this.$store.commit('SET_SIDEBAR_CONTENT', e.features[0]));
    },
    predictiveRender() {
      const updatedPilots = [];
      for (const pilot of this.predictiveSource.data.features) {
        const longitude = pilot.geometry.coordinates[0];
        const latitude = pilot.geometry.coordinates[1];
        const { heading } = pilot.properties;
        const speed = pilot.properties.groundspeed;
        const distance = (speed / 3600) * 1852 * 0.5;
        // predictiverender mixin
        const newCoords = this.destinationFix(latitude, longitude, distance, heading);
        const newPilot = {
          ...pilot,
          geometry: {
            type: 'Point',
            coordinates: newCoords,
          },
        };

        updatedPilots.push(newPilot);
      }

      this.predictiveSource.data.features = updatedPilots;

      const newData = {
        id: 'pilots',
        type: 'FeatureCollection',
        features: updatedPilots,
      };

      if (newData) {
        const source = this.$store.state.map.getSource('pilots');
        if (source) source.setData(newData);
      }

      this.updatedPilots = [];
    },
    fixTrail(updatedPilots) {
      const source = this.$store.state.map.getSource('pilotsTrailSource');

      // if an aircraft is selected...
      if (source) {
        const data = source._data.features;
        const { callsign } = data[0].properties;

        const pilot = updatedPilots.filter((station) => station.properties.callsign === callsign);
        const longitude = pilot[0].geometry.coordinates[0];
        const latitude = pilot[0].geometry.coordinates[1];
        const newPoint = data;
        newPoint[0].geometry.coordinates[0] = [longitude, latitude];

        this.$store.state.map.getSource('pilotsTrailSource').setData({
          type: 'FeatureCollection',
          features: newPoint,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.popup {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  font-size: 12px;
  color: #e5e5e5;
  font-weight: 600;
  text-shadow: 0px 0px 1.5px #000;
  position: absolute;
  line-height: 1.1em;
  background: rgba(0, 0, 0, 0.2);
  border: 0;
  padding: 0.35rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.mapboxgl-popup-content {
  background: transparent;
  box-shadow: none;
}

.mapboxgl-popup-tip {
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
}
</style>
