<template>
  <div v-if="geojson.type">
    <div v-if="showLabels">
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
  computed: {
    showLabels() {
      const options = JSON.parse(this.$store.state.options);
      if (typeof options.aircraftLabels !== 'undefined') {
        return options.aircraftLabels;
      }
      return false;
    },
  },
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
          'text-offset': [0, -1.5],
          'text-size': 11,
        },
        paint: {
          'text-color': '#fff',
        },
      },
    };
  },
  mounted() {
    this.initPilots();
    this.addClickListeners();
    setInterval(async () => {
      await this.updatePilots();
    }, 15000);

    setInterval(() => {
      const mapZoom = this.$store.state.map.getZoom();
      if (this.predictiveSource.data && mapZoom > 6.5) this.predictiveRender();
    }, 500);
  },
  methods: {
    async fetchPilots() {
      const response = await fetch('https://map-dev.vatsim.net/api/v1/network/online/pilots');
      const data = await response.json();
      return data;
    },
    async updatePilots() {
      const newData = await this.fetchPilots();
      this.lastFetch = newData;
      this.predictiveSource = newData;
      this.$store.commit('setPilotsData', newData);
      this.$store.state.map.getSource('pilots').setData(newData.data);
    },
    async initPilots() {
      const newData = await this.fetchPilots();
      this.$store.commit('setPilotsData', newData);
      this.geojson = newData;
      this.lastFetch = newData;
      this.predictiveSource = newData;
    },
    addClickListeners() {
      this.$store.state.map.on('click', 'pilotsLayer', (e) => this.$store.commit('setSideBarContent', e.features[0]));
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

      if (newData) this.$store.state.map.getSource('pilots').setData(newData);
      this.fixTrail(updatedPilots);
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
