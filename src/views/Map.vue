<template>
  <div class="map">
    <SideBarManager class="SideBarManager" />
    <MglMap :token="token" :mapStyle="style">
      <div v-if="$store.state.mapLoaded">
        <!-- <MapSearch /> -->
        <!-- <OnlineCenters /> -->
        <!-- <ControllerLayers /> -->
        <PilotsLayer />
        <!-- <TrailLayer /> -->
        <AirportMarkers />
        <WeatherRadar v-if="$store.state.options.map.weather" />
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
import SigmetLayer from '@/components/MapLayers/SigmetLayer.vue';
import AirportMarkers from '@/components/MapMarkers/AirportMarkers';
import AirportIcon from '@/components/MapLayers/AirportIcon.vue';
import MapImages from '@/mixins/MapImages';

export default {
  name: 'Map',
  components: {
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
  mixins: [MapImages],
  data() {
    return {
      token: process.env.VUE_APP_MAP_TOKEN,
    };
  },
  computed: {
    style() {
      if (this.$store.state.options.darkMode) return 'mapbox://styles/markdoyle/ck7ziswea26v21in02hvdrafj?optimize=true';
      return 'mapbox://styles/markdoyle/ck99rtdu30lwx1inzmz80kkzn';
    },
  },
  mounted() {
    this.$root.$on('changeMode', () => this.switchMap());
  },
  methods: {
    switchMap() {
      this.$store.commit('SET_MAP_STATUS', false);
      this.$store.state.map.on('style.load', () => {
        if (!this.$store.state.mapLoaded) {
          if (!this.$store.state.options.darkMode) {
            this.removeImages();
            this.addDarkImages();
          } else this.addImages();
        }
        this.$store.commit('SET_MAP_STATUS', true);
      });
    },
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
</style>
