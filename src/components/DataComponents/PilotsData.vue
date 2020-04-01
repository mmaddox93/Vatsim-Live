<template>
  <div class="data-details">
    <div class="data-header">
      <div class="title">Currently Online {{$route.name}}</div>
      <div class="search">
        <input placeholder="Search..." type="text" v-model="search" />
      </div>
    </div>
    <DataScroller v-if="pilots[0]" :data="filteredList" />
  </div>
</template>

<script>
import DataScroller from '@/components/DataComponents/DataScroller.vue';

export default {
  components: { DataScroller },
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
  },
  created() {
    if (!this.$store.state.pilotsData.data) this.fetchPilots();
    else this.pilots = this.$store.state.pilotsData.data.features;
  },
  methods: {
    async fetchPilots() {
      const response = await fetch('https://map-dev.vatsim.net/api/v1/network/online/pilots');
      const data = await response.json();
      this.$store.commit('setPilotsData', data);
      console.log(data);
      this.pilots = data.data.features;
    },
  },
};
</script>

<style lang="scss" scoped>
.data-details {
  width: 100%;
  height: 100%;
  margin: 0 2rem;
}

.data-header {
  border: 1px solid var(--border);
  border-bottom: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: var(--tertiary);
}

input {
  color: white;
  border: 1px solid var(--border);
  background-color: var(--secondary);
  border-radius: 7px;
  padding: 10px 15px;

  &:focus {
    outline: solid thin var(--blue);
  }
}
</style>
