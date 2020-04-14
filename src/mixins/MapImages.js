export default {
  methods: {
    addImages() {
      this.$store.state.map.loadImage(
        'https://i.imgur.com/4Lhn9MY.png',
        (err, image) => {
          this.$store.state.map.addImage('airplaneIcon', image);
          if (err) throw err;
        },
      );
    },
  },
};
