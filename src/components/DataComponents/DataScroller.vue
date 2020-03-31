<template>
  <div class="DataScroller">
    <RecycleScroller
      v-if="data"
      class="recycle-scroller"
      :items="data"
      :item-size="64"
      :page-mode="true"
      key-field="id"
    >
      <template v-slot="props">{{props.index}} {{props.item.properties.callsign}}</template>
    </RecycleScroller>
  </div>
</template>

<script>
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

export default {
  components: { RecycleScroller },
  props: ['data'],
};
</script>

<style lang="scss" scoped>
.recycle-scroller {
  height: 100%;
}

.list-item-cont {
  position: relative;
}
</style>
