<template>
  <div class="flex-row">
    <div class="spacer"></div>
    <div class="flex-col">
      <section>
        <LineChart class="LineChart" :chartData="history" chartTitle="Total Connections" />
      </section>
      <section>
        <CurrentConnections :data="history" />
      </section>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/GraphComponents/LineChart';
import CurrentConnections from '../../components/DataComponents/CurrentConnections.vue';
import history from './history.json';

export default {
  // eslint-disable-next-line vue/no-unused-components
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
