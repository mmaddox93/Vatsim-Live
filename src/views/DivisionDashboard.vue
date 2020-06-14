<template>
  <div class="dashboard">
    <TopNav />
    <div class="dashboard__content">
      <DivisionSidebar />
      <DivisionSearch />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TopNav from '@/components/TopNav/TopNav.vue';
import DivisionSidebar from '@/components/DivisionComponents/DivisionSidebar.vue';
import DivisionSearch from '@/components/DivisionComponents/DivisionSearch.vue';

export default Vue.extend({
  name: 'DivisionDashboard',
  components: { TopNav, DivisionSidebar, DivisionSearch },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.dashboard__content {
  height: inherit;
  width: 100%;
  display: flex;
}
</style>
