<script>
import MapboxGeoCoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

export default {
  render: () => null,
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

      geocoder.on('result', (e) => this.$store.commit('setSideBarContent', e.result));
    },
    forwardGeocoder(query) {
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
};
</script>

<style lang="scss">
.mapboxgl-ctrl-geocoder {
  color: var(--white);
  background-color: var(--secondary);
}

.mapboxgl-ctrl-geocoder--input {
  font-family: 'Poppins', sans-serif;
  color: var(--white);

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
