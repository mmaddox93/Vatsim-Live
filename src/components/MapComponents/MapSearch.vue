<script lang="ts">
import Vue from 'vue';
import MapboxGeoCoder from '@mapbox/mapbox-gl-geocoder'; /* no types avail */
import mapboxgl from 'mapbox-gl';

export default Vue.extend({
  mounted() {
    this.addGeoCoder();
  },
  methods: {
    addGeoCoder() {
      const geocoder = new MapboxGeoCoder({
        accessToken: process.env.VUE_APP_MAP_TOKEN,
        flyTo: {
          offset: [+150, 0],
        },
        mapboxgl,
        localGeocoder: this.forwardGeocoder,
        zoom: 7,
        marker: false,
        clearOnBlur: true,
        clearAndBlurOnEsc: true,
        limit: 10,
        localGeocoderOnly: true,
        placeholder: 'Search VATSIM...',
      });
      this.$store.state.map.addControl(geocoder, 'top-left');

      interface Result {
        result: object
      }

      geocoder.on('result', (e: Result) => {
        console.log(e);
        this.$store.commit('setSideBarContent', e.result);
      });
    },
    forwardGeocoder(query: string) {
      const matchingFeatures = [];
      for (let i = 0; i < this.$store.state.pilotsData.data.features.length; i++) {
        const feature = this.$store.state.pilotsData.data.features[i];
        if (feature.properties.callsign.toLowerCase().search(query.toLowerCase()) !== -1 || feature.properties.realname.toLowerCase().search(query.toLowerCase()) !== -1) {
          feature.place_name = `${feature.properties.callsign} - ${feature.properties.realname}`;
          feature.center = feature.geometry.coordinates;
          matchingFeatures.push(feature);
        }
      }
      return matchingFeatures;
    },
  },
});
</script>

<style lang="scss">
.mapboxgl-ctrl-top-left {
  @media screen and (max-width: 400px) {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.mapboxgl-ctrl-geocoder {
  color: var(--white);
  background-color: var(--secondary);
  border-radius: 7px;
}

.mapboxgl-ctrl-geocoder--input,
.mapboxgl-ctrl-geocoder {
  font-family: 'Poppins', sans-serif;
  color: var(--white);
  max-width: 95vw;

  @media screen and (max-width: 400px) {
    top: 0.5rem;
    margin: 0 !important; // override lib styles
    max-width: 100vw;
    width: calc(100vw - 1.25rem);
  }

  &:focus {
    color: var(--white);
  }
}

.mapboxgl-ctrl-geocoder--button {
  background-color: var(--secondary);
}

.mapboxgl-ctrl-geocoder--icon-search,
.mapboxgl-ctrl-geocoder--icon-close {
  fill: var(--white);
}

.mapboxgl-ctrl button:not(:disabled):hover {
  fill: rgba(255, 255, 255, 0.6);
}

.mapboxgl-ctrl-geocoder .suggestions > li > a {
  color: var(--white);
  background-color: var(--secondary);

  &:hover {
    background-color: var(--secondaryHov);
    color: var(--white);
  }
}

.mapboxgl-ctrl-geocoder .suggestions > .active > a {
  background-color: var(--secondaryAct);
  color: var(--white);
}

.mapbox-gl-geocoder--error {
  background-color: var(--secondary);
  color: var(--lighter);
}

div > .suggestions {
  background-color: var(--secondary) !important;
}

::placeholder {
  color: var(--lighter);
  font-family: 'Poppins', sans-serif;
}
</style>

<template>
<div></div>
</template>
