<template>
  <div class="flex-row">
    <div class="spacer"></div>
    <section>
      <LineChart class="LineChart" :chartData="history" chartTitle="Total Connections" />
    </section>
  </div>
</template>

<script>
import LineChart from '@/components/GraphComponents/LineChart';
import history from './history.json';

export default {
  components: { LineChart },
  data() {
    return {
      history,
    };
  },
};
</script>

<style lang="scss">
.flex-row,
section {
  padding-top: 0;
  width: 100%;
}
</style>
