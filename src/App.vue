<template>
  <div id="app">
    <TopNav />
    <keep-alive>
      <router-view />
    </keep-alive>
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

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

body {
  color: white;
  background-color: var(--primary);
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

* {
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}
</style>
