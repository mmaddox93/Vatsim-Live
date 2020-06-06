<template>
  <div class="editor">
    <TopNav />
    <div class="editor__content">
      <EditorSidebar />
      <div class="editor__center">
        <EditorTable />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TopNav from '@/components/TopNav/TopNav.vue';
import EditorSidebar from '@/components/EditorComponents/EditorSidebar.vue';
import EditorTable from '@/components/EditorComponents/EditorTable.vue';

export default Vue.extend({
  name: 'SectorEditor',
  components: { TopNav, EditorSidebar, EditorTable },
});
</script>

<style lang="scss">
.editor {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.editor__content {
  display: flex;
  height: 100%;
}

.editor__center {
  // width: 100%;
  height: 100%;
  padding: 2rem;
}
</style>
