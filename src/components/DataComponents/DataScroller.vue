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
          <div class="main-details">
            {{props.item.properties.callsign}}
            <span
              class="name"
            >-{{props.item.properties.realname}} </span>
          </div>
          <button class="map-btn" @click="openMap(props.item)">View on map</button>
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
    async openMap(station) {
      console.log(station);
      await this.$router.push({ path: '/' });
      const setSidebar = setInterval(() => {
        if (this.$store.state.mapLoaded) {
          this.$store.commit('setSideBarContent', station);
          clearInterval(setSidebar);
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
  justify-content: space-between;
  background-color: var(--secondary);
  height: 64px;
  border: 1px solid var(--border);
  border-top: 1px solid transparent;
}

.map-btn {
  font-weight: 800;
  cursor: pointer;
  outline: none;
  background-color: var(--blue);
  border: none;
  border-radius: 7px;
  color: var(--white);
  position: absolute;
  right: 1rem;
  padding: 10px 16px;
  top: 12px;

  &:hover {
    background-color: var(--blueHov);
  }
}

.name {
  color: var(--lighter);
}
</style>
