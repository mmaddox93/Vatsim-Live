<template>
  <div class="sidebar">
    <FlightDetails v-if="content.properties.transponder" :content="content" />
    <ControllerDetails v-else :content="content.properties" />
  </div>
</template>

<script>
import AddTrail from '@/mixins/AddTrail';
import FlightDetails from '@/components/SideBarComponents/FlightDetails.vue';
import ControllerDetails from '@/components/SideBarComponents/ControllerDetails.vue';

export default {
  components: {
    FlightDetails, ControllerDetails,
  },
  mixins: [AddTrail],
  props: ['content'],
  updated() {
    if (this.content.properties.transponder) this.flyToFeature();
    // if (this.content.properties.type === 'pilot') this.fetchTrail(this.content.properties.callsign);
  },
  mounted() {
    if (this.content.properties.transponder) this.flyToFeature();
    // if (this.content.properties.type === 'pilot') this.fetchTrail(this.content.properties.callsign);
  },
  methods: {
    closeSidebar() {
      this.$emit('closeSidebar');
    },
    flyToFeature() {
      this.$store.state.map.flyTo({
        center: this.content.geometry.coordinates,
        offset: [+150, 0],
        speed: 1,
        essential: true,
      });
    },
  },
};

</script>

<style lang="scss" scoped>
.sidebar {
  overflow: hidden;
  height: 100%;
  position: relative;
  background-color: var(--primary);
  width: min-content;
  z-index: 4;
  min-width: 400px;
  overflow: auto;
  transition: all 200ms ease-in-out;
}

.close-button {
  width: 2rem;
  height: 2rem;
  background-color: #333333;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: all 150ms ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #4d4d4d;
  }
}

.close-icon {
  width: 2rem;
  height: 2rem;
}

@media (max-width: 620px) {
  .sidebar {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-width: 0;
    height: min-content;
    min-height: 100vh;
  }
}
</style>
