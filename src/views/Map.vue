<template>
  <div class="map">
    <WelcomeToast />
    <SideBarManager class="SideBarManager" />
    <MglMap :token="token" :mapStyle="mapStyle">
      <div v-if="$store.state.mapLoaded">
        <!-- <OnlineCenters /> -->
        <ControllerLayers />
        <PilotsLayer />
        <!-- <TrailLayer /> -->
        <WeatherRadar v-if="showWxRadar" />
        <SigmetLayer />
      </div>
    </MglMap>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import MglMap from '@/components/MapComponents/MglMap.vue';
import PilotsLayer from '@/components/MapLayers/PilotsLayer.vue';
import ControllerLayers from '@/components/MapLayers/ControllerLayers.vue';
import TrailLayer from '@/components/MapLayers/TrailLayer.vue';
import SideBarManager from '@/components/SideBarComponents/SideBarManager.vue';
import WeatherRadar from '@/components/MapLayers/WeatherRadar.vue';
import OnlineCenters from '@/components/MapLayers/OnlineCenters.vue';
import WelcomeToast from '@/components/WelcomeToast.vue';
import SigmetLayer from '@/components/MapLayers/SigmetLayer.vue';

export default {
  name: 'Home',
  data() {
    return {
      token: process.env.VUE_APP_MAP_TOKEN,
      mapStyle: 'mapbox://styles/markdoyle/ck7ziswea26v21in02hvdrafj?optimize=true',
    };
  },
  computed: {
    showWxRadar() {
      const options = JSON.parse(this.$store.state.options);
      if (typeof options.weather !== 'undefined') {
        return options.weather;
      }
      return false;
    },
  },
  components: {
    WelcomeToast,
    PilotsLayer,
    MglMap,
    SideBarManager,
    TrailLayer,
    WeatherRadar,
    ControllerLayers,
    OnlineCenters,
    SigmetLayer,
  },
};
</script>

<style lang="scss" scoped>
.map {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
