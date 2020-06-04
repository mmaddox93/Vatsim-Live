import Vue from 'vue';
import renderless from '@/mixins/renderless';
import { makeInjector } from '@/helpers/inject';

const collectionPropInjector = makeInjector<{ map: mapboxgl.Map }>();

export default collectionPropInjector(Vue, ['map']).extend({
  mixins: [renderless],
  inject: ['map'],
  data() {
    return {
      firstLoad: true,
    };
  },
  props: {
    source: {
      required: true,
      type: [Object, Promise],
    },
    layer: {
      required: true,
      type: Object,
    },
  },
  created(): void {
    if (this.source) {
      this.$watch('source', (next) => {
        if (this.firstLoad) {
          this.lateMount();
          return;
        }
        const source: any = this.map.getSource(this.source.data.id);
        if (source) source.setData(next.data);
      }, { deep: true });
      this.lateMount();
    }
  },
  beforeDestroy() {
    this.map.removeLayer(this.layer.id);
    this.map.removeSource(this.source.data.id);
  },
  methods: {
    addLayer(): void {
      const exists = this.map.getLayer(this.layer.id);

      const layer = {
        source: this.source.data.id,
        ...this.layer,
      };

      try {
        if (exists) this.map.removeLayer(this.layer.id);
        this.map.addLayer(layer);
        this.$emit('added', this.layer.id);
      } catch (error) {
        throw new Error(error);
      }
    },
    lateMount(): void {
      if (this.source.data) {
        this.firstLoad = false;
        const exists = this.map.getSource(this.source.data.id);
        if (exists) {
          this.map.removeSource(this.source.data.id);
        }
        this.map.addSource(this.source.data.id, this.source);
        this.addLayer();
      }
    },
  },
});
