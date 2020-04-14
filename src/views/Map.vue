<template>
  <div class="map">
    <WelcomeToast class="welcome-toast" />
    <SideBarManager class="SideBarManager" />
    <MglMap :token="token" :mapStyle="mapStyle">
      <div v-if="$store.state.mapLoaded">
        <MapSearch />
        <!-- <OnlineCenters /> -->
        <!-- <ControllerLayers /> -->
        <PilotsLayer />
        <!-- <TrailLayer /> -->
        <AirportMarkers />
        <WeatherRadar v-if="showWxRadar" />
        <SigmetLayer />
        <AirportIcon />
      </div>
    </MglMap>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import MglMap from '@/components/MapComponents/MglMap.vue';
import MapSearch from '@/components/MapComponents/MapSearch.vue';
import PilotsLayer from '@/components/MapLayers/PilotsLayer.vue';
import ControllerLayers from '@/components/MapLayers/ControllerLayers.vue';
import TrailLayer from '@/components/MapLayers/TrailLayer.vue';
import SideBarManager from '@/components/SideBarComponents/SideBarManager.vue';
import WeatherRadar from '@/components/MapLayers/WeatherRadar.vue';
import OnlineCenters from '@/components/MapLayers/OnlineCenters.vue';
import WelcomeToast from '@/components/WelcomeToast.vue';
import SigmetLayer from '@/components/MapLayers/SigmetLayer.vue';
import AirportMarkers from '@/components/MapMarkers/AirportMarkers';
import AirportIcon from '@/components/MapLayers/AirportIcon.vue';

export default {
  name: 'Map',
  data() {
    return {
      token: process.env.VUE_APP_MAP_TOKEN,
      mapStyle: 'mapbox://styles/markdoyle/ck7ziswea26v21in02hvdrafj?optimize=true',
    };
  },
  computed: {
    showWxRadar() {
      let options;
      try {
        options = JSON.parse(this.$store.state.options);
      } catch (error) {
        return false;
      }
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
    MapSearch,
    AirportMarkers,
    AirportIcon,
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
}

.welcome-toast {
  z-index: 3;
  position: absolute;
  bottom: 0;
  width: 100vw;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
