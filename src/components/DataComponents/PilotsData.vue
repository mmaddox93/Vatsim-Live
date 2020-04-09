<template>
  <div class="data-details" :style="{ height }">
    <div class="data-header" :class="{ 'data-header-border': pilots[0]}">
      <div class="title">Currently Online {{$route.name}}</div>
      <div class="search">
        <input placeholder="Search..." type="text" v-model="search" />
      </div>
    </div>
    <PilotScroller v-if="pilots[0]" :data="filteredList" />
  </div>
</template>

<script>
import PilotScroller from '@/components/DataComponents/PilotScroller.vue';

export default {
  components: { PilotScroller },
  data() {
    return {
      pilots: [],
      search: '',
    };
  },
  computed: {
    filteredList() {
      // eslint-disable-next-line arrow-body-style
      return this.pilots.filter((pilot) => {
        if (pilot.properties.callsign.toLowerCase().includes(this.search.toLowerCase())) return pilot;
        if (pilot.properties.realname.toLowerCase().includes(this.search.toLowerCase())) return pilot;
      });
    },
    height() {
      return `${this.pilots.length * 64}px`;
    },
  },
  created() {
    if (!this.$store.state.pilotsData.data) this.fetchPilots();
    else this.pilots = this.$store.state.pilotsData.data.features;
  },
  mounted() {
    this.$emit('height', this.height);
  },
  methods: {
    async fetchPilots() {
      const response = await fetch('https://map-dev.vatsim.net/api/v1/pilots/online');
      const data = await response.json();
      this.$store.commit('setPilotsData', data);
      this.pilots = data.data.features;
    },
  },
};
</script>

<style lang="scss" scoped>
.data-details {
  width: 100%;
  margin: 0 2rem;
}

.data-header {
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: var(--secondary);
}

.data-header-border {
  border: 1px solid var(--border);
}

input {
  color: white;
  border: 1px solid var(--border);
  background-color: var(--tertiary);
  border-radius: 7px;
  padding: 10px 15px;

  &:focus {
    outline: solid thin var(--blue);
  }
}
</style>
