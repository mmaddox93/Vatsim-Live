<template>
  <div class="mglmap">
    <slot></slot>
    <div class="map-container" :id="container">
      <!-- <MapSettings /> -->
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapImages from '@/mixins/MapImages';
import SaveSession from '@/mixins/SaveSession';
import ClickController from '@/mixins/ClickController';
import MapSettings from '@/components/MapComponents/MapSettings.vue';

export default {
  mixins: [MapImages, SaveSession, ClickController],
  // eslint-disable-next-line vue/no-unused-components
  components: { MapSettings },
  data() {
    return {
      mapCenter: [0, 52],
      mapZoom: 4,
    };
  },
  props: {
    mapStyle: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    container: {
      type: String,
      default: 'map',
    },
  },
  created() {
    this.getLastSession();
  },
  destroyed() {
    this.$store.commit('SET_MAP_STATUS', false);
  },
  mounted() {
    this.addMap();
    window.onresize = () => this.$store.state.map.resize();
    this.arrangeLayers();
    setInterval(() => {
      this.arrangeLayers();
    }, 1000);
  },
  methods: {
    addMap() {
      mapboxgl.accessToken = this.token;
      const map = new mapboxgl.Map({
        container: this.container,
        style: this.mapStyle,
        center: this.mapCenter,
        zoom: this.mapZoom,
      });
      this.$store.commit('SET_MAP', map);
      map.on('load', () => {
        this.$store.commit('SET_MAP_STATUS', true);
        this.startClickController();
        if (this.$store.state.options.darkMode) this.addImages();
        else this.addDarkImages();
        this.saveSession();
        this.setAttribution();
      });
    },
    getLastSession() {
      if (localStorage.mapCenter) this.mapCenter = localStorage.mapCenter.split(',');
      if (localStorage.zoom) this.mapZoom = localStorage.zoom;
    },
    async arrangeLayers() {
      if (this.map.length >= 7) {
        // this.$store.state.map.moveLayer('onlineFirboundsLayer');
        this.$store.state.map.moveLayer('rainviewer');
        this.$store.state.map.moveLayer('approach_atc');
        this.$store.state.map.moveLayer('tower_atc');
        this.$store.state.map.moveLayer('ground_atc');
        this.$store.state.map.moveLayer('delivery_atc');
        this.$store.state.map.moveLayer('pilotsLayer');
        this.$store.state.map.moveLayer('sigmetAtc');
        // if (this.map.includes('trailLayer')) this.$store.state.map.moveLayer('trailLayer');
      }
    },
    setAttribution() {
      const attributionEl = document.querySelector('.mapboxgl-ctrl-attrib-inner');

      for (const el of attributionEl.children) {
        el.setAttribute('rel', 'noreferrer');
      }

      // rel="noreferrer"
    },
  },
  computed: {
    map() {
      return this.$store.state.listOfLayers;
    },
  },
  watch: {
    map(layers) {
      for (const layer of layers) {
        if (layer !== 'rainviewer') {
          // this.$store.state.map.on('mouseover', layer, () => this.$store.state.map.getCanvas().style.cursor = 'pointer');
          // this.$store.state.map.on('mouseout', layer, () => this.$store.state.map.getCanvas().style.cursor = '');
        }
      }
    },
    mapStyle(newVal) {
      this.$store.state.map.setStyle(newVal);
    },
  },
};
</script>

<style lang="scss">
.map-container {
  position: relative;
}

.mapboxgl-map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
