import Vue from 'vue';

export default Vue.extend({
  methods: {
    addImages() {
      const planeIcon = 'https://i.imgur.com/4Lhn9MY.png';
      this.$store.state.map.loadImage(planeIcon, (err: string, image: object) => {
        if (err) throw err;
        this.$store.state.map.addImage('airplaneIcon', image);
      });
    },
  },
});
