<template>
  <div class="FlightDetails">
    <div class="button-controls">
      <button
        id="track-btn"
        @click="toggleTrack()"
        :class="{ 'highlight-btn': track }"
        class="button-interactions"
      >
        Track Flight
        <inline-svg
          :class="{ 'highlight-btn': track }"
          class="button-control-icon left-margin button-interactions"
          fill="#fff"
          :src="require('../../assets/img/svg/eye.svg')"
        />
      </button>
      <inline-svg
        @click="close()"
        id="close-btn"
        class="button-control-icon button-interactions"
        fill="#fff"
        :src="require('../../assets/img/svg/close.svg')"
      />
    </div>
    <section>
      <header>{{content.properties.callsign}}</header>
      <div class="arr-dep" v-if="hasFlightPlan">
        <div class="info-group arr-dep-info">
          <label for="departure">DEPARTURE</label>
          <span class="large" id="departure">{{content.properties.planned_depairport}}</span>
        </div>
        <div class="info-group arr-dep-info">
          <label for="departure">DEPARTURE</label>
          <span class="large" id="departure">{{content.properties.planned_destairport}}</span>
        </div>
      </div>
      <div class="four-item-row">
        <div class="info-group four-item" v-if="hasFlightPlan" title="The aircraft type">
          <label for="aircraft">AIRCRAFT</label>
          <span id="aircraft">{{content.properties.planned_aircraft}}</span>
        </div>
        <div class="info-group four-item" title="The aircraft's current altitude">
          <label for="altitude">ALTITUDE</label>
          <span id="altitude">{{content.properties.altitude}}</span>
        </div>
        <div class="info-group four-item" title="The aircraft's current heading">
          <label for="heading">HEADING</label>
          <span id="heading">{{content.properties.heading}}</span>
        </div>
        <div class="info-group four-item" title="The aircraft's current speed">
          <label for="speed">SPEED</label>
          <span id="speed">{{content.properties.groundspeed}}</span>
        </div>
      </div>
    </section>
    <section>
      <header>Member</header>
      <div class="two-item-row">
        <div class="info-group">
          <label for="departure">NAME</label>
          <span id="departure">{{content.properties.realname}}</span>
        </div>
        <div class="info-group">
          <label for="departure">CID</label>
          <span id="departure">{{content.properties.cid}}</span>
        </div>
      </div>
    </section>
    <section v-if="hasFlightPlan">
      <header>Flight Plan Info</header>
      <div class="four-item-row">
        <div class="info-group four-item" title="The aircraft's filed flight rules">
          <label for="aircraft">RULES</label>
          <span id="aircraft">{{content.properties.planned_flighttype}}</span>
        </div>
        <div class="info-group four-item" title="The aircraft's filed airspeed">
          <label for="altitude">TAS</label>
          <span id="altitude">{{content.properties.planned_tascruise}}</span>
        </div>
        <div class="info-group four-item" title="The aircraft's filed cruise altitude">
          <label for="heading">ALTITUDE</label>
          <span id="heading">{{content.properties.planned_altitude}}</span>
        </div>
        <div class="info-group four-item" title="The aircraft's alternate airfield">
          <label for="speed">ALTERNATE</label>
          <span id="speed">{{content.properties.planned_altairport}}</span>
        </div>
      </div>
      <div>
        <div class="info-group" title="The aircraft's remarks">
          <label for="speed">REMARKS</label>
          <span id="speed">{{content.properties.planned_remarks}}</span>
        </div>
      </div>
    </section>
    <section v-if="hasFlightPlan">
      <header>Flight Plan Route</header>
      <span id="route">
        <span v-for="(point, index) in route" :key="`point-${index}`">
          <span :class="point.class">{{point.word}} {{' '}}</span>
        </span>
      </span>
    </section>
    <section class="center-align" v-else>
      <div class="section-message">NO FLIGHTPLAN FILED</div>
    </section>
  </div>
</template>

<script>
import InlineSvg from 'vue-inline-svg';

export default {
  components: { InlineSvg },
  props: {
    content: {
      required: true,
    },
  },
  data() {
    return {
      track: false,
    };
  },
  created() {
    this.trackFlight();
    console.log(this.content);
  },
  computed: {
    hasFlightPlan() {
      if (this.content.properties.planned_route !== 'null') {
        return true;
      }
      return false;
    },
    route() {
      const route = this.content.properties.planned_route;
      console.log(route);
      if (route) {
        const output = route.split(' ').map((word) => {
          const point = word.split('/')[0];
          if (point === 'DCT') return { word: point, class: 'DCT' };
          if (point.match(/\d/) && (['N', 'S'].includes(point.charAt(2))) && (['E', 'W'].includes(point.charAt(6)))) return { word: point, class: 'latlong' };
          if (point.match(/\d/) && (point.length >= 6 && point.length <= 7)) return { word: point, class: 'sidstar' };
          if (point.match(/\d/)) return { word: point, class: 'airway' };
          return { word: point, class: 'num' };
        });
        return output;
      }
      return [{ word: 'Flightplan does not contain a valid route' }];
    },
  },
  watch: {
    'member.cid': function () {
      this.resetError();
    },
  },
  methods: {
    close() {
      this.$store.commit('setSideBarContent', null);
      this.track = false;
    },
    imageLoadError() {
      this.imageValid = false;
    },
    resetError() {
      this.imageValid = true;
    },
    toggleTrack() {
      this.track = !this.track;
    },
    trackFlight() {
      setInterval(() => {
        if (this.track) {
          const feature = this.$store.state.map.querySourceFeatures('pilots', {
            sourceLayer: 'pilotsLayer',
            filter: ['in', 'callsign', this.content.properties.callsign],
          });
          if (feature) {
            this.$store.state.map.flyTo({
              center: feature[0].geometry.coordinates,
              offset: [150, 0],
              speed: 0.2,
              essential: true,
            });
          }
        }
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
.FlightDetails {
  max-width: 500px;
  margin: 2rem;
  box-sizing: border-box;
}

.arr-dep {
  display: flex;
  justify-content: center;
}

.arr-dep-info {
  flex: 1 1 auto;
}

.latlong {
  color: #58e679;
}

.sidstar {
  color: #ff87c1;
}

.airway {
  color: var(--blue);
}

.DCT {
  color: grey;
}

.large {
  font-size: 2rem;
  font-weight: 800;
}

.button-controls {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
}

.button-control-icon {
  height: 2rem;
  width: auto;
  background-color: var(--secondary);
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
  cursor: pointer;
  transition: background-color 100ms ease-in-out;

  &:hover {
    background-color: var(--secondaryHov);

    .button-control-icon {
      background-color: var(--secondaryHov);
    }
  }

  &:active {
    background-color: var(--secondaryAct);

    .button-control-icon {
      background-color: var(--secondaryHov);
    }
  }
}

.highlight-btn {
  background-color: #139bda;

  &:hover {
    background-color: #1c8abd;

    .button-control-icon {
      background-color: #1c8abd;
    }
  }
}
</style>
