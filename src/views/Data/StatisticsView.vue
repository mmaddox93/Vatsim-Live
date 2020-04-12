<template>
  <div class="flex-col">
    <section>
      <LineChart class="LineChart" :chartData="history" chartTitle="Total Connections" />
    </section>
    <section>
      <CurrentConnections :data="history" />
    </section>
  </div>
</template>

<script>
import LineChart from '@/components/GraphComponents/LineChart';
import CurrentConnections from '../../components/DataComponents/CurrentConnections.vue';
import history from './history.json';

export default {
  components: { LineChart, CurrentConnections },
  data() {
    return {
      history,
    };
  },
};
</script>

<style lang="scss">
.flex-row,
.flex-col,
section {
  padding-top: 0;
  width: 100%;
}
</style>
