/* eslint-disable no-unused-vars */
import mapboxgl from 'mapbox-gl';

export default {
  render: () => null,
  data() {
    return {
      airports: {},
      currentMarkers: [],
    };
  },
  mounted() {
    this.setAirports();

    // setInterval(() => {
    //   this.setAirports();
    // }, 15000);
  },
  methods: {
    async fetchAirports() {
      const response = await fetch('https://map-dev.vatsim.net/api/v1/online/airports');
      const data = await response.json();
      this.$store.commit('setAirportsData', data);
      return data;
    },
    async setAirports() {
      const data = await this.fetchAirports();
      this.airports = data;

      const addedMarkers = [];
      for (const airport of this.airports.data.features) {
        if (airport.properties.controllers.length > 0) {
          const orderOfIcons = ['D', 'G', 'T', 'A'];
          const markerBbox = document.createElement('div');

          const markerCont = document.createElement('div');
          markerBbox.appendChild(markerCont);
          markerCont.addEventListener('click', (e) => this.$root.$emit('airportClick', airport.properties.icao));

          const circleMarker = document.createElement('div');
          const markerIcao = document.createElement('span');

          markerIcao.innerHTML = airport.properties.icao;
          markerIcao.classList.add('marker-span');
          markerCont.appendChild(markerIcao);
          markerCont.classList.add('airport-marker-cont');

          const onlinePositionsSet = new Set();
          // iterate through every controller at the airport
          airport.properties.controllers.map((controller) => {
            let typeOfController = '';
            if (controller.includes('DEL')) typeOfController = 'D';
            else if (controller.includes('GND')) typeOfController = 'G';
            else if (controller.includes('TWR')) typeOfController = 'T';
            else if (controller.includes('APP') || controller.includes('DEP')) typeOfController = 'A';
            onlinePositionsSet.add(typeOfController);
          });

          const onlinePositions = Array.from(onlinePositionsSet);

          const sortedPositions = onlinePositions.sort((a, b) => orderOfIcons.indexOf(a) - orderOfIcons.indexOf(b));

          for (const position of sortedPositions) {
            const controllerIcon = document.createElement('div');
            const controllerLetter = document.createElement('span');
            controllerIcon.classList = `airport-marker-icon ${position}`;
            controllerLetter.classList = 'controller-letter';
            controllerLetter.innerHTML = position;
            controllerIcon.appendChild(controllerLetter);
            markerCont.appendChild(controllerIcon);
          }

          const airportMarker = new mapboxgl.Marker(markerBbox).setLngLat(airport.geometry.coordinates).addTo(this.$store.state.map);
          addedMarkers.push(airportMarker);
          for (const marker of this.currentMarkers) {
            marker.remove();
          }
          this.currentMarkers = [];
        }
      }
      this.currentMarkers.push(...addedMarkers);
    },
  },
};
