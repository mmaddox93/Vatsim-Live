<template>
  <div class="DataScroller">
    <RecycleScroller
      v-if="data"
      class="recycle-scroller"
      :items="data"
      :item-size="64"
      :page-mode="true"
      key-field="id"
    >
      <template v-slot="props">
        <div class="list-item">
          <div class="item vertical">
            {{props.item.properties.callsign}}
            <span class="name">{{props.item.properties.realname}}</span>
          </div>
          <div class="item route" v-if="props.item.properties.planned_depairport !== 'null'">
            <span class="bold">{{props.item.properties.planned_depairport}}</span>
            <span class="lighter">-</span>
            <span class="bold">{{props.item.properties.planned_destairport}}</span>
          </div>
          <div class="item route" v-else>No flightplan filed</div>
          <span
            v-if="props.item.properties.planned_route"
            class="item lighter"
          >{{props.item.properties.planned_aircraft}}</span>
          <button class="map-btn item" @click="openMap(props.item)">View on map</button>
        </div>
      </template>
    </RecycleScroller>
  </div>
</template>

<script>
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

export default {
  components: { RecycleScroller },
  props: ['data'],
  methods: {
    openMap(station) {
      this.$router.push({ path: '/' });
      const tryMap = setInterval(() => {
        if (this.$store.state.mapLoaded) {
          this.$store.commit('setSideBarContent', station);
          clearInterval(tryMap);
        }
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.DataScroller {
  margin-bottom: 1rem;
}

.list-item {
  position: relative;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--secondary);
  height: 64px;
  border: 1px solid var(--border);
  border-top: 1px solid transparent;
}

.item {
  &:first-child {
    width: 30%;
    justify-content: flex-start;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16.66%;
}

.vertical {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

.route {
  span:first-child {
    font-weight: 800;
  }
}

.map-btn {
  transition: background-color 200ms linear;
  font-weight: 800;
  cursor: pointer;
  outline: none;
  background-color: var(--blue);
  border: none;
  border-radius: 7px;
  color: var(--white);
  padding: 10px;

  &:hover {
    background-color: var(--blueHov);
  }
}

.name {
  color: var(--lighter);
  line-height: 100%;
}
</style>
