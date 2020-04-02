<template>
  <div class="SubHeader">
    <h1 class="title">{{title}}</h1>
    <span class="sub-title">{{subtitle}}</span>
  </div>
</template>

<script>
export default {
  props: ['title', 'subtitle'],
};
</script>

<style lang="scss" scoped>
.SubHeader {
  background-color: var(--secondary);
  padding: 1rem 3rem;
  width: 100vw;
}

.title {
  font-size: 1.5rem;
  font-weight: 400;
}

.sub-title {
  color: var(--lighter);
}
</style>
