<template>
  <MglLayer v-if="trailLayer" :source="trailLayer.source" :layer="trailLayer.layer" />
</template>

<script>
// not currently in use
import MglLayer from '@/components/MapComponents/MglLayer';

export default {
  components: {
    MglLayer,
  },
  computed: {
    trailLayer() {
      return this.$store.state.trailLayer;
    },
  },
  watch: {
    trailLayer(newVal, oldVal) {
      if (oldVal !== null) {
        this.$store.state.map.getSource('pilotsTrailSource').setData(newVal.source.data);
      }
    },
  },
};
</script>
