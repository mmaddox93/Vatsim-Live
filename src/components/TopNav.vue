<template>
  <div class="TopNav">
    <img src="@/assets/img/VatsimLogo.png" class="vatsim-img-logo" />
    <NavList />
  </div>
</template>

<script>
import NavList from '@/components/NavList.vue';

export default {
  components: { NavList },
};
</script>

<style lang="scss" scoped>
.TopNav {
  padding: 0.5rem 1rem;
  display: flex;
  width: 100vw;
  background-color: $secondary;
  z-index: 4;
  position: relative;
}

.vatsim-img-logo {
  height: 2.5rem;
  width: auto;
  margin-right: 0.5rem;
}
</style>
