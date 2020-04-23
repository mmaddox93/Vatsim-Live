<template>
  <aside ref="sidebar" class="sidebar">
    <div class="button-controls">
      <button
        v-if="content.properties"
        id="track-btn"
        @click="toggleFlightTrack()"
        :class="{ 'highlight-btn': trackFlight }"
        class="button-interactions"
      >
        Track Flight
        <inline-svg
          :class="{ 'highlight-btn': trackFlight }"
          class="button-control-icon left-margin"
          fill="#fff"
          :src="require('../../assets/img/svg/eye.svg')"
        />
      </button>
      <div v-else></div>
      <inline-svg
        @click="close()"
        id="close-btn"
        class="button-control-icon button-interactions"
        fill="#fff"
        :src="require('../../assets/img/svg/close.svg')"
      />
    </div>
    <FlightDetails v-if="content.properties" :content="content" :track="trackFlight" />
    <!-- <AirportDetails v-else :airport="content" /> -->
  </aside>
</template>

<script>
import AddTrail from '@/mixins/AddTrail';
import FlightDetails from '@/components/SideBarComponents/FlightDetails.vue';
import AirportDetails from '@/components/SideBarComponents/AirportDetails.vue';
import InlineSvg from 'vue-inline-svg';

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    FlightDetails, AirportDetails, InlineSvg,
  },
  mixins: [AddTrail],
  props: ['content'],
  data() {
    return {
      trackFlight: false,
    };
  },
  updated() {
    if (this.content.properties) this.flyToFeature();
    this.$refs.sidebar.scrollTop = 0;
    // if (this.content.properties.type === 'pilot') this.fetchTrail(this.content.properties.callsign);
  },
  mounted() {
    if (this.content.properties) this.flyToFeature();
    // if (this.content.properties.type === 'pilot') this.fetchTrail(this.content.properties.callsign);
  },
  methods: {
    close() {
      this.$store.commit('SET_SIDEBAR_CONTENT', null);
      this.trackFlight = false;
    },
    flyToFeature() {
      this.$store.state.map.flyTo({
        center: this.content.geometry.coordinates,
        offset: [+150, 0],
        speed: 1,
        essential: true,
      });
    },
    toggleFlightTrack() {
      this.trackFlight = !this.trackFlight;
    },
  },
};

</script>

<style lang="scss" scoped>
.sidebar {
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

.button-controls {
  margin: 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
}

.button-control-icon {
  height: 2rem;
  width: auto;
}

.close-icon {
  width: 2rem;
  height: 2rem;
}

.left-margin {
  margin-left: 0.5rem;
  height: 1.25rem;
}

button {
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  outline: none;
  border: none;
  padding: 0.25rem 1rem;
  background-color: var(--secondary);
  display: flex;
  align-items: center;
  border-radius: 4px;
}

.button-interactions {
  background-color: var(--tertiary);
  color: var(--lighter);
  cursor: pointer;
  transition: background-color 100ms ease-in-out;

  @media screen and (prefers-color-scheme: light) {
    color: var(--text);
  }

  &:hover {
    filter: brightness(1.2);
    @media screen and (prefers-color-scheme: light) {
      filter: brightness(0.95);
    }
  }

  &:active {
    filter: brightness(1.4);

    @media screen and (prefers-color-scheme: light) {
      filter: brightness(0.85);
    }
  }
}

.highlight-btn {
  // background-color: #139bda;

  // &:hover {
  //   background-color: #1c8abd;

  //   .button-control-icon {
  //     background-color: #1c8abd;
  //   }
  // }
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

<style lang="scss">
.button-control-icon > path,
.button-control-icon > circle {
  fill: var(--text);

  @media screen and (prefers-color-scheme: light) {
    fill: var(--lighter);
  }
}
</style>
