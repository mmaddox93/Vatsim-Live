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
          <th class="editor__header"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="editor__row">
          <td class="editor__index center">1</td>
          <td class="editor__item">55.333333</td>
          <td class="editor__item">-7.333333</td>
          <td class="editor__item">You, yesterday</td>
          <td class="editor__item">
            <Edit2Icon class="editor__icon" size="20" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Edit2Icon } from 'vue-feather-icons';

export default Vue.extend({
  name: 'EditorCoords',
  components: { Edit2Icon },
});
</script>

<style lang="scss" scoped>
.card {
  padding-bottom: 0;
}

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

.editor__index {
  background-color: var(--highlightBlue);
  height: 3rem;
  width: 3rem;
  border-radius: 15px;
  margin-right: 0.75rem;
}

.editor__item {
  width: max-content;
  padding: 1rem;
}

.editor__icon {
  cursor: pointer;
  transition: all 100ms ease-in-out;

  &:hover {
    filter: opacity(0.8);
  }
}
</style>
