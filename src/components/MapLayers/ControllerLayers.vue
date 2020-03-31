<script>
// not currently in use
import mapboxgl from 'mapbox-gl';
import MglLayer from '@/components/MapComponents/MglLayer';

export default {
  render: () => null,
  components: {
    MglLayer,
  },
  mounted() {
    this.initController();
  },
  methods: {
    async initController() {
      const response = await fetch('https://map-dev.vatsim.net/api/v1/network/online/controllers?groupBy=type&strict=false');
      const data = await response.json();
      this.initialFetch = data;
      // not currently in use
      // this.initGroundControllers();
    },
    initGroundControllers() {
      for (const feature of this.initialFetch.GND.data.features) {
        const el = document.createElement('div');
        el.innerHTML = feature.properties.callsign;

        new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(this.$store.state.map);
      }
    },
  },
  data() {
    return {
      centersFetch: {},
      initialFetch: {},
      delLayer: {
        id: 'delivery_atc',
        type: 'circle',
        paint: {
          'circle-radius': {
            stops: [
              [5, 8],
              [15, 7000],
            ],
            base: 2,
          },
          'circle-color': '#ff7700',
          'circle-opacity': 0.5,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ff7700',
        },
      },
      gndLayer: {
        id: 'ground_atc',
        type: 'circle',
        paint: {
          'circle-radius': {
            stops: [
              [5, 11],
              [15, 9000],
            ],
            base: 2,
          },
          'circle-color': '#ffdf00',
          'circle-opacity': 0.5,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffdf00',
        },
      },
      twrLayer: {
        id: 'tower_atc',
        source: 'TWRcontrollers',
        type: 'circle',
        paint: {
          'circle-radius': {
            stops: [
              [5, 20],
              [15, 12500],
            ],
            base: 2,
          },
          'circle-color': '#5F89E9',
          'circle-opacity': 0.5,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#5F89E9',
        },
      },
      appLayer: {
        id: 'approach_atc',
        type: 'circle',
        source: 'aerodromeAppSource',
        paint: {
          'circle-radius': {
            stops: [
              [5, 30],
              [15, 20000],
            ],
            base: 2,
          },
          'circle-color': '#1000FF',
          'circle-opacity': 0.5,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#1000FF',
        },
      },
      onlineFill: {
        id: 'center_atc',
        type: 'fill',
        source: 'onlineFirBounds',
        paint: {
          'fill-color': 'grey',
          'fill-opacity': 0.2,
        },
      },
    };
  },
};
</script>
