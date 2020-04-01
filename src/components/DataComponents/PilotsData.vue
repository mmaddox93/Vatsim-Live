<template>
  <div class="data-details">
    <div class="data-header">Currently Online {{$route.name}}</div>
    <DataScroller v-if="pilots[0]" :data="this.$store.state.pilotsData.data.features" />
  </div>
</template>

<script>
import DataScroller from '@/components/DataComponents/DataScroller.vue';

export default {
  components: { DataScroller },
  created() {
    if (!this.$store.state.pilotsData.data) this.fetchPilots();
  },
  computed: {
    pilots() {
      return (this.$store.state.pilotsData.data ? this.$store.state.pilotsData.data.features : '');
    },
  },
  methods: {
    async fetchPilots() {
      const response = await fetch('https://map-dev.vatsim.net/api/v1/network/online/pilots');
      const data = await response.json();
      this.$store.commit('setPilotsData', data);
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
  padding: 0 1rem;
  height: 2.5rem;
  background-color: var(--tertiary);
}
</style>
