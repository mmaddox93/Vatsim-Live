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
    addDarkImages() {
      const planeIcon = 'https://i.imgur.com/UkD9XRc.png';
      this.$store.state.map.loadImage(planeIcon, (err: string, image: object) => {
        if (err) throw err;
        this.$store.state.map.addImage('airplaneIcon', image);
      });
    },
    removeImages() {
      if (this.$store.state.map.hasImage('airplaneIcon')) {
        this.$store.state.map.removeImage('airplaneIcon');
      }
    },
  },
});
