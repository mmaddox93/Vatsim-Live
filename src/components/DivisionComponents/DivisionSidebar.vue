<template>
  <div class="sidebar">
    <h1>sidebar</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DivisionSidebar',
});
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: var(--secondary);
  min-width: 350px;
  width: 350px;
  height: 100%;
  padding: 1rem 1.875rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 800px) {
    min-width: 150px;
    width: 150px;
  }
}
</style>
