export default {
  render: () => null,
  data() {
    return {
      registeredClicks: [],
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
      this.$root.$on('airportClick', (value) => {
        // this.handleClick(value);
        this.registeredClicks.push(value);
      });

      // listen to clicks on geojson layers
      this.$store.state.map.on('click', (e) => {
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
        const indexOfAirport = this.registeredClicks.findIndex((click) => typeof click === 'string');
        if ((indexOfAirport) >= 0) this.handleAirportClick(this.registeredClicks[indexOfAirport]);
        else this.handlePilotClick(this.registeredClicks[0]); /* implement click handlers for other layers */
        this.registeredClicks = [];
      }
    },
    handleAirportClick(icao) {
      this.$store.commit('setSideBarContent', icao);
    },
    handlePilotClick(pilot) {
      this.$store.commit('setSideBarContent', pilot[0]);
    },
  },
};
