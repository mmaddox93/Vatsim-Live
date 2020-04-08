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
  created() {
    if (localStorage.options) {
      const options = JSON.parse(localStorage.options);
      this.$store.commit('updateOptions', options);
    }
  },
};
</script>
