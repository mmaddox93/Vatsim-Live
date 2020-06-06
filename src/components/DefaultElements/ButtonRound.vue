<template>
  <button :class="customClass" class="button">
    <div class="button__content">
      <slot></slot>
      <span>{{text}}</span>
    </div>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ButtonStandard',
  props: {
    text: {
      type: String,
      required: true,
    },
    customClass: {
      type: String,
      required: false,
    },
  },

});
</script>

<style lang="scss" scoped>
.button {
  background-color: var(--highlightBlue);
  border: none;
  border-radius: 15px;
  outline: none;
  padding: 0 0.875rem;
  min-width: 50px;
  min-height: 50px;
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  box-shadow: var(--boxShadow);
  font-family: inherit;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
    background-color: var(--highlightBlueActive);
  }

  @media (max-width: 600px) {
    min-width: 30px;
  }
}

.button__content {
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button__icon {
  height: 10px;
  width: 10px;
}
</style>
