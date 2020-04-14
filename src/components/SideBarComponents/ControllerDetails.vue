<template>
  <div>{{airport}}</div>
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
    this.fetchAirportData(this.airport);
  },
  methods: {
    fetchAirportData() {
      // fetch data from api
    },
  },
};
</script>
