<template>
  <div :id="container">
    <slot v-if="initialized"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import mapboxgl from 'mapbox-gl';

export default Vue.extend({
  props: {
    mapStyle: {
      required: true,
      type: String,
    },
    token: {
      required: true,
      type: String,
    },
    center: {
      required: true,
      type: Array as any as () => [number, number],
    },
    container: {
      required: false,
      type: String,
      default: 'map',
    },
  },
  provide() {
    const self = this;
    return {
      get map() {
        return self.map;
      },
    };
  },
  data() {
    return {
      map: {} as mapboxgl.Map,
      initialized: false,
    };
  },
  computed: {
    zoom(): number {
      return this.initialized ? this.map.getZoom() : 0;
    },
    loaded(): boolean {
      return this.initialized ? this.map.loaded() : false;
    },
  },
  watch: {
    mapStyle(newVal: string) {
      this.map.setStyle(newVal);
    },
  },
  mounted(): void {
    this.map = this.initMap();
  },
  methods: {
    initMap(): mapboxgl.Map {
      mapboxgl.accessToken = this.token;

      const options = {
        container: this.container,
        style: this.mapStyle,
        center: this.center,
        zoom: 5,
      };

      const map = new mapboxgl.Map(options);

      map.on('load', () => {
        this.initialized = true;
        this.$emit('load');
        this.setAttribution();
      });

      map.on('click', () => this.$emit('click'));

      return map;
    },
    setAttribution(): void {
      const attributionEl = document.querySelector('.mapboxgl-ctrl-attrib-inner');
      if (!attributionEl) return;
      // eslint-disable-next-line no-restricted-syntax
      for (const el of attributionEl.children) {
        el.setAttribute('rel', 'noreferrer');
      }
    },
  },
});
</script>

<style lang="scss">
.mapboxgl-map,
.mapboxgl-canvas-container,
.mapboxgl-canvas {
  height: 100%;
  width: 100%;
}
</style>
