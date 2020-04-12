<template>
  <div></div>
</template>

<script>
// not currently in use
export default {
  props: {
    airport: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log(this.airport);
  },
};
</script>
