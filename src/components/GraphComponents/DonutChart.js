import { Doughnut, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;
export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartTitle: {
      type: String,
    },
  },
  data() {
    return {
      gradient: null,
    };
  },
  mounted() {
    this.renderChart(
      this.chartData, { responsive: true, maintainAspectRatio: false },
    );
  },
};
