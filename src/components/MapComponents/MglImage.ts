import Vue from 'vue';
import renderless from '@/mixins/renderless';
import { makeInjector } from '@/helpers/inject';

const collectionPropInjector = makeInjector<{ map: mapboxgl.Map }>();

export default collectionPropInjector(Vue, ['map']).extend({
  mixins: [renderless],
  inject: ['map'],
  props: {
    id: {
      required: true,
      type: String,
    },
    url: {
      required: true,
      type: String,
    },
  },
  created() {
    const exists = this.map.hasImage(this.id);
    if (exists) this.map.removeImage(this.id);

    this.map.loadImage(this.url, (error: string, image: HTMLImageElement) => {
      if (error) throw new Error(error);
      this.map.addImage(this.id, image);
    });
  },
  beforeDestroy() {
    this.map.removeImage(this.id);
  },
});
