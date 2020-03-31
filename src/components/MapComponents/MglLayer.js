export default {
  name: 'MglLayer',
  render: () => null,
  mounted() {
    this.checkLayer();
  },
  beforeDestroy() {
    this.removeLayer();
  },
  watch: {
    source: {
      immediate: true,
      handler() {
        this.checkLayer();
      },
    },
  },
  methods: {
    async checkLayer() {
      const layerExists = this.$store.state.map.getLayer(this.layer.id);
      const layers = this.$store.state.listOfLayers;
      const sources = this.$store.state.map.style.sourceCaches;
      const newSourceId = this.source.data.id;

      if (!(newSourceId in sources)) this.addSource();

      if (layers.includes(this.layer.id)) {
        if (layerExists) this.$store.state.map.removeLayer(this.layer.id);

        this.addLayer();
      } else {
        this.addLayer();
      }
    },
    addLayer() {
      this.$store.commit('addLayerToList', this.layer.id);
      this.layer.source = this.source.data.id;
      try {
        this.$store.state.map.addLayer(this.layer);
      } catch (error) {
        console.log(error);
      }
    },
    addSource() {
      this.$store.state.map.addSource(this.source.data.id, this.source);
    },
    removeLayer() {
      const layer = this.$store.state.map.getLayer(this.layer.id);
      if (layer) this.$store.state.map.removeLayer(this.layer.id);
      this.$store.commit('removeLayerfromList', this.layer.id);
    },
    removeSource() {
      this.$store.state.map.removeSource(this.source.data.id);
    },
  },
  props: {
    source: {
      type: Object,
      required: true,
    },
    layer: {
      type: Object,
      required: true,
    },
  },
};
