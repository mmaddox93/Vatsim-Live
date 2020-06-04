<template>
  <div class="editor">
    <TopNav />
    <EditorSidebar />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TopNav from '@/components/TopNav/TopNav.vue';
import EditorSidebar from '@/components/EditorComponents/EditorSidebar.vue';

export default Vue.extend({
  name: 'SectorEditor',
  components: { TopNav, EditorSidebar },
});
</script>

<style lang="scss">
.editor {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
