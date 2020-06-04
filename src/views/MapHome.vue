<template>
  <div class="MapHome">
    <MglMap :token="token" :mapStyle="style" :center="center" container="map">
      <PilotsLayer />
      <TestLayer />
    </MglMap>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MglMap from '@/components/MapComponents/MglMap.vue';
import PilotsLayer from '@/components/MapLayers/PilotsLayer.vue';
import TestLayer from '@/components/MapLayers/TestLayer.vue';

export default Vue.extend({
  name: 'MapHome',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MglMap, PilotsLayer, TestLayer,
  },
  data() {
    return {
      center: [0, 52] as [number, number],
      token: process.env.VUE_APP_MAP_TOKEN,
      style: 'mapbox://styles/markdoyle/cka8wroqr2wi61jo28l4vq2hd',
    };
  },
});
</script>

<style lang="scss" scoped>
.MapHome {
  height: 100vh;
  width: 100vw;
}
</style>
