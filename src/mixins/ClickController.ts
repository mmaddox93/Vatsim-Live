import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      registeredClicks: [] as (string | object[])[],
    };
  },
  watch: {
    registeredClicks() {
      setTimeout(() => {
        this.handleClick();
      }, 30);
    },
  },
  methods: {
    startClickController() {
      // listen for clicks to airport markers
      this.$root.$on('airportClick', (value: string) => {
        this.registeredClicks.push(value);
      });

      interface ClickEvent {
        point: {
          x: number
          y: number
        }
      }

      // listen to clicks on geojson layers
      this.$store.state.map.on('click', (e: ClickEvent) => {
        const bbox = [
          [e.point.x - 2.5, e.point.y - 2.5],
          [e.point.x + 2.5, e.point.y + 2.5],
        ];

        const features = this.$store.state.map.queryRenderedFeatures(bbox, {
          layers: ['pilotsLayer'],
        });

        if (features.length > 0) {
          this.registeredClicks.push(features);
        }
      });
    },
    handleClick() {
      if (this.registeredClicks.length > 0) {
        /* get index of first airport in array */
        const airportIcao = this.registeredClicks.find((click): click is string => typeof click === 'string');
        console.log(this.registeredClicks);
        if (airportIcao) this.handleAirportClick(airportIcao);
        else this.handlePilotClick(this.registeredClicks[0][0] as object); /* implement click handlers for other layers */
        this.registeredClicks = [];
      }
    },
    handleAirportClick(icao: string) {
      this.$store.commit('setSideBarContent', icao);
    },
    handlePilotClick(pilot: object) {
      this.$store.commit('setSideBarContent', pilot);
    },
  },
});
