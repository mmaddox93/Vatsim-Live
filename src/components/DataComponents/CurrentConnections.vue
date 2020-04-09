<script>
import DonutChart from '@/components/GraphComponents/DonutChart';

export default {
  components: { DonutChart },
  props: ['data'],
  mounted() {
    this.initData();
  },
  data() {
    return {
      connectionData: {},
    };
  },
  methods: {
    async initData() {
      const response = await fetch('https://stats.vatsim.net/user_count_json.php', {
        mode: 'no-cors',
      });
      const data = await response.json();
      this.connectionData = data;
    },
  },
};
</script>

<template>
  <div class="CurrentConnections">
    <DonutChart :chartData="data" />
  </div>
</template>
