<template>
  <table class="PilotScroller">
    <thead>
      <tr class="header-row">
        <th>Pilot</th>
        <th>Route</th>
        <th>Aircraft Type</th>
        <th>
          <!-- intentionally blank for view flight btn  -->
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="pilot in data" :key="pilot.callsign">
        <td>
          <span v-if="pilot.properties.callsign && pilot.properties.callsign !== 'null'">
            {{pilot.properties.callsign}}
            <span class="lighter">{{pilot.properties.realname}}</span>
          </span>
        </td>
        <td
          v-if="pilot.properties.planned_depairport && pilot.properties.planned_depairport !== 'null'"
        >
          <span>{{pilot.properties.planned_depairport}} - {{pilot.properties.planned_destairport}}</span>
        </td>
        <td v-else></td>
        <td>
          <span
            v-if="pilot.properties.planned_aircraft !== 'null' && pilot.properties.planned_aircraft"
          >{{pilot.properties.planned_aircraft}}</span>
        </td>
        <td>
          <button>View on map</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import * as searchAnimation from './lottieSearch.json';

export default {
  props: ['data'],
  data() {
    return {
      defaultOptions: {
        animationData: searchAnimation.default,
      },
    };
  },
  methods: {
    openMap(station) {
      this.$router.push({ path: '/' });
      const tryMap = setInterval(() => {
        if (this.$store.state.mapLoaded) {
          this.$store.commit('SET_SIDEBAR_CONTENT', station);
          clearInterval(tryMap);
        }
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-spacing: 0;
}

thead {
  width: 100%;
  background-color: var(--secondary);
}

td {
  padding: 1rem;
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
</style>
