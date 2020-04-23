<template>
  <div class="airport-details">
    <div v-if="fetchedData.data">
      <div v-for="(station, index) in fetchedData.data.features" :key="`point-${index}`">
        <div>{{station.properties.callsign}}</div>
      </div>
    </div>
    <SkeletonLoader v-else />
  </div>
</template>

<script>
import SkeletonLoader from '@/components/SkeletonLoader.vue';

export default {
  components: { SkeletonLoader },
  data() {
    return {
      fetchedData: {},
    };
  },
  props: {
    airport: {
      type: String,
      required: true,
    },
  },
  created() {
    this.fetchAirportData(this.airport);
  },
  updated() {
    this.fetchAirportData(this.airport);
  },
  methods: {
    async fetchAirportData(icao) {
      this.fetchedData = {};
      const response = await fetch(`https://map-dev.vatsim.net/api/v1/online/controllers?ids=${icao}&strict=false`);
      const data = await response.json();
      this.fetchedData = data;
    },
  },
};
</script>

<style lang="scss">
.airport-details {
  display: flex;
  justify-content: center;
  padding: 1rem;
  height: 100%;
  width: 100%;
}
</style>
