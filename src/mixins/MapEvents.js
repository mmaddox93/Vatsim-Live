export default {

  computed: {
    layers() {
      return this.$store.state.listOfLayers;
    },
    sidebarContent() {
      return this.$store.state.sidebarContent;
    },
  },
  methods: {
    addEventListeners() {
    },
  },
};
