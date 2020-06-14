<template>
  <div class="topnav">
    <div class="topnav__logo">
      <div class="topnav__title bold">Developer Portal</div>
    </div>
    <div class="topnav__user"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  name: 'TopNav',
});
</script>

<style lang="scss" scoped>
.topnav {
  width: 100vw;
  padding: 0.75rem 1.25rem;
  background-color: var(--quaternary);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topnav__user {
  width: 35px;
  height: 35px;
  background: var(--grey);
  border-radius: 15px;
}
</style>
