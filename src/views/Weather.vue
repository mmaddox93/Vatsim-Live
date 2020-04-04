<template>
  <div class="Weather">
    <HalfCircle />
  </div>
</template>

<script>
import HalfCircle from '../components/GraphComponents/HalfCircle.vue';

export default {
  components: { HalfCircle },
};
</script>

<style lang="scss">
.Weather {
  height: 100vh;
  width: 100vw;
  background-color: white;
}
</style>
