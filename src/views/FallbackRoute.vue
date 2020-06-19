<template>
  <div class="fallback center">
    <div class="fallback__initial center">
      <span>
        <br />h1 {
        <span class="fallback__indent">
          margin: 0;
          <br />padding: 0;
          <br />font-size: 100%;
          <br />vertical-align: baseline;
        </span>
        }
        <br />
        <br />h1 {
        <span class="fallback__indent">
          margin: 0;
          <br />padding: 0;
          <br />font-size: 100%;
          <br />vertical-align: baseline;
        </span>
        }
        <br />
        <br />.error-message-content {
        <span class="fallback__indent">
          font-size: 14px;
          <br />font-family: Helvetica Neue,HelveticaNeue,sans-serif;
          <br />line-height: 21px;
        </span>
        }
      </span>
      <span class="blinkingCursor" style="display: none;">|</span>
    </div>
    <div class="fallback__cont">
      <div class="fallback__title fallback__title-upper">404</div>
      <div class="fallback__title">404</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

});
</script>

<style lang="scss" scoped>
.fallback {
  width: 100%;
  height: 100%;
}

.fallback__initial {
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  background-color: var(--primary);
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  font-size: 1.1rem;
}

.fallback__cont {
  z-index: 0;
  position: relative;
}

.fallback__indent {
  display: block;
  margin-left: 10px;
}

.fallback__title {
  -webkit-text-stroke: 2px var(--highlightBlue);
  filter: opacity(0.3);
  color: transparent;
  font-size: 30vmin;
  font-weight: 700;
  font-family: 'Prompt', Tahoma, Verdana, sans-serif;
  line-height: 25vmin;
  display: inline-block;
  vertical-align: top;
}

.fallback__title-upper {
  -webkit-text-stroke: 2px var(--white);
  filter: opacity(1);
  z-index: 3;
  position: absolute;
  transition: transform 150ms ease-in-out;
  height: min-content;

  &:hover {
    transform: scale(1.3);
  }
}
</style>
