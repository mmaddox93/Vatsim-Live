<template>
  <div id="app">
    <TopNav />
    <router-view />
  </div>
</template>

<script>
import TopNav from '@/components/TopNav.vue';

export default {
  components: { TopNav },
  computed: {
    darkMode() {
      return this.$store.state.options.darkMode;
    },
  },
  created() {
    this.setMode(this.$store.state.options.darkMode);
  },
  watch: {
    darkMode(newVal) {
      this.setMode(newVal);
    },
  },
  methods: {
    setMode(darkMode) {
      if (darkMode) document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.setAttribute('data-theme', 'light');
    },
  },
};
</script>
