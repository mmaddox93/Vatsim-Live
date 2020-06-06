<template>
  <div class="card">
    <div class="bold">Sector Coordinates</div>
    <div class="divider"></div>
    <table class="editor__table">
      <thead class="editor__head">
        <tr class="editor__header__row">
          <th class="editor__header"></th>
          <th class="editor__header">Latitude</th>
          <th class="editor__header">Longitude</th>
          <th class="editor__header">Last Edit</th>
        </tr>
      </thead>
      <tbody class="editor__body">
        <tr
          v-for="(coord, index) in sector.geometry.coordinates"
          :key="coord[4]"
          class="editor__row"
        >
          <td class="editor__index center">{{index + 1}}</td>
          <td class="editor__item">
            <input
              type="text"
              v-model="coord[0]"
              class="edit__input editor__item-small"
              :class="{ 'edit__input-empty': coord[1].length === 0}"
            />
          </td>
          <td class="editor__item">
            <input
              type="text"
              v-model="coord[1]"
              class="edit__input editor__item-small"
              :class="{ 'edit__input-empty': coord[1].length === 0}"
            />
          </td>
          <!-- <td class="editor__item">{{coord.lastEdit}}</td> -->
        </tr>
      </tbody>
    </table>
    <div @click="addNew()" class="editor__new">
      Add New Point
      <PlusIcon size="18" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PlusIcon } from 'vue-feather-icons';

export default Vue.extend({
  name: 'EditorCoords',
  components: { PlusIcon },
  props: {
    sector: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addNew() {
      this.$emit('addPoint');
    },
  },
});
</script>

<style lang="scss" scoped>
.divider {
  margin-top: 0.75rem;
  margin-bottom: 0;
}

.editor__table {
  border-spacing: 0 0.75rem;
}

.editor__header__row {
  border-bottom: 1px solid var(--divider);
}

.editor__header {
  border-bottom: 1px solid var(--divider);
  padding-bottom: 0.75rem;
}

.editor__body {
  max-height: 10vh;
  overflow: auto;
  width: 100%;
}

.editor__index {
  background-color: var(--highlightBlue);
  height: 3rem;
  width: 3rem;
  border-radius: 15px;
  margin-right: 0.75rem;
}

.editor__item {
  padding: 1rem;
}

.editor__item-small {
  text-align: center;
  max-width: calc(12ch);
}

.editor__icon {
  cursor: pointer;
  transition: all 100ms ease-in-out;

  &:hover {
    filter: opacity(0.8);
  }
}

.editor__new {
  font-weight: 800;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 2px dashed var(--highlightBlue);
  border-radius: 7px;
  background-color: rgba(0, 136, 255, 0.2);
  transition: all 100ms linear;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 136, 255, 0.4);
  }
}
</style>
