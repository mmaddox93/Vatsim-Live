export default {
  methods: {
    addImages() {
      this.$store.state.map.loadImage(
        'https://i.imgur.com/IML8MOz.png',
        (err, image) => {
          this.$store.state.map.addImage('airplaneIcon', image);
          if (err) throw err;
        },
      );

      this.$store.state.map.loadImage(
        'https://i.imgur.com/IML8MOz.png',
        (err, image) => {
          this.$store.state.map.addImage('groundIcon', image);
          if (err) throw err;
        },
      );
    },
  },
};
