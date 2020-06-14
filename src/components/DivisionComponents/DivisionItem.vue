<template>
  <div
    class="item pointer"
    @mouseenter="showOptions = !showOptions"
    @mouseleave="showOptions = !showOptions"
  >
    <div class="item__icon">
      <BoxIcon size="20" v-if="item.type === 'Sector'" />
      <UserIcon size="20" v-else />
    </div>
    <div class="item__details">
      <div class="item__title bold">{{item.name}}</div>
      <div class="item__subtitle">{{item.acc}} · {{item.type}} · {{item.lastEdit}}</div>
    </div>
    <div
      class="item__options center"
      v-if="showOptions"
      @click.stop="$emit('optionsClick', $event)"
    >
      <MoreHorizontalIcon />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BoxIcon, UserIcon, MoreHorizontalIcon } from 'vue-feather-icons';

export default Vue.extend({
  name: 'DivisionItem',
  components: { BoxIcon, UserIcon, MoreHorizontalIcon },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showOptions: false,
    };
  },
});
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  width: calc(100% + 2rem);
  display: flex;
  align-items: center;
  margin-left: -1rem;
  padding: 1rem;
  border-radius: 10px;
  transition: all 50ms linear;
  cursor: pointer;

  &:hover {
    background-color: var(--quaternary);
  }
}

.item__title {
  font-size: 20px;
  margin-bottom: 0.25rem;
}

.item__subtitle {
  font-size: 15px;
  color: var(--grey);
}

.item__icon {
  height: 3rem;
  width: 2.5rem;
  background-color: var(--tertiary);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.item__options {
  position: absolute;
  right: 1.5rem;
  background-color: var(--tertiary);
  padding: 0.5rem;
  border-radius: 50px;
  transition: all 100ms linear;

  &:hover {
    background-color: var(--secondary);
  }
}
</style>
