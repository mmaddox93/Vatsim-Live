<template>
  <div class="editor">
    <TopNav />
    <div class="editor__content">
      <EditorSidebar :sector="sector" />
      <div class="editor__center">
        <EditorTable @addPoint="addPoint" :sector="sector" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TopNav from '@/components/TopNav/TopNav.vue';
import EditorSidebar from '@/components/EditorComponents/EditorSidebar.vue';
import EditorTable from '@/components/EditorComponents/EditorTable.vue';
import { v4 as uuidv4 } from 'uuid';

export default Vue.extend({
  name: 'SectorEditor',
  components: { TopNav, EditorSidebar, EditorTable },
  data() {
    return {
      sector: {
        type: 'Feature',
        properties: {
          id: '7fdf028c-dba9-4750-b23b-4bd136951c08',
          upperLimit: '60000',
          lowerLimit: '0',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[53.33333, -7.33333, 0, '']],
        },
      },
    };
  },
  methods: {
    addPoint() {
      this.sector.geometry.coordinates.push([0, 0, 0, uuidv4()]);
    },
  },
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
