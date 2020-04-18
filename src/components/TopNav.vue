<template>
  <header class="TopNav">
    <img src="@/assets/img/VatsimLogo.png" class="vatsim-img-logo" alt="VATSIM logo" />
    <NavList />
  </header>
</template>

<script>
import NavList from '@/components/NavList.vue';

export default {
  components: { NavList },
};
</script>

<style lang="scss" scoped>
header {
  font-size: 1rem;
  margin-top: 0;
  font-weight: normal;
}

.TopNav {
  padding: 0.5rem 1rem;
  display: flex;
  width: 100vw;
  background-color: var(--secondary);
  z-index: 4;
  position: relative;
  border-bottom: 1px solid var(--border);
}

.vatsim-img-logo {
  height: 2.5rem;
  width: auto;
  margin-right: 0.5rem;
}
</style>
