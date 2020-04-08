import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;
export default {
  extends: Line,
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
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, 'rgba(171, 91, 249, 0.5)');
    this.gradient.addColorStop(0.75, 'rgba(171, 91, 249, 0.05)');
    this.chartData.datasets[0].backgroundColor = this.gradient;

    this.renderChart(
      this.chartData,
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          fontFamily: "'Poppins', sans-serif",
          fontColor: 'white',
          display: true,
          text: this.chartTitle,
          padding: 20,
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              padding: 15,
              fontColor: 'white',
              maxTicksLimit: 9,
              fontFamily: "'Poppins', sans-serif",
            },
            gridLines: {
              drawBorder: false,
              color: '#343536',
            },
          }],
          xAxes: [{
            ticks: {
              padding: 5,
              fontColor: 'white',
              maxTicksLimit: 9,
              fontFamily: "'Poppins', sans-serif",
            },
            gridLines: {
              display: false,
            },
          }],
        },
      },
    );
  },
  updated() { this.chartData.datasets[0].backgroundColor = this.gradient; },
};
