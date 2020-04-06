<template>
  <div class="Data">
    <SubHeader
      title="Current Connections To VATSIM"
      subtitle="Browse all the current connections to the network."
    />
    <div class="content-cont">
      <div class="left-col">
        <div class="category-selector">
          <div class="category-title">Categories</div>
          <ol>
            <router-link :to="{ path: '/data/' }">
              <li>Pilots</li>
            </router-link>
            <router-link :to="{ path: '/data/controllers' }">
              <li>Controllers</li>
            </router-link>
            <li>Supervisors</li>
            <li>Observers</li>
          </ol>
        </div>
        <CircleGraph />
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader.vue';
import CircleGraph from '../components/GraphComponents/CircleGraph.vue';

export default {
  components: { SubHeader, CircleGraph },
};
</script>

<style lang="scss" scoped>
.Data {
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  overflow-x: hidden;
}

.content-cont {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 2rem 5rem;
  max-width: 1248px;
}

.left-col {
  display: flex;
  flex-direction: column;
  // align-items: center;
}

.category-selector {
  min-width: 175px;
}

.category-title {
  position: sticky;
  background-color: var(--tertiary);
  border-radius: 4px 4px 0 0;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-bottom-color: var(--borderDark);
}

ol {
  background-color: var(--secondary);
  border: 1px solid var(--border);
  border-top: none;
  border-radius: 0 0 4px 4px;
}

li {
  padding: 0.5rem 1rem;
}
</style>
