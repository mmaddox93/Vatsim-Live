<template>
  <div>
    <div class="details">
      <div class="section-body vertical">
        <h2 class="callsign">{{content.callsign}}</h2>
        <div class="pilot">{{member.name}}</div>
      </div>
      <div class="divider"></div>
      <div class="section">
        <h3 class="section-header">Details</h3>
        <div class="section-body no-top wide">
          <div class="label-cont four-row">
            <div class="subtitle">Freq</div>
            <h3 class="data">{{frequency}}</h3>
          </div>
          <div class="label-cont four-row">
            <div class="subtitle">Rating</div>
            <h3 class="data">{{rating}} </h3>
          </div>
          <div class="label-cont four-row">
            <div class="subtitle">Server</div>
            <h3 class="data">{{content.server}}</h3>
          </div>
          <div class="label-cont single-row">
            <div class="subtitle">ATIS</div>
            <h3 class="data">{{content.atis}}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// not currently in use
export default {
  props: {
    content: {
      required: true,
    },
  },
  computed: {
    member() {
      return JSON.parse(this.content.member);
    },
    rating() {
      const rating = this.content.rating - 1;
      return ((rating < 3) ? `S${rating}` : `C${rating - 2}`);
    },
    frequency() {
      const freq = `1${this.content.frequency}`;
      return `${freq.slice(0, 3)}.${freq.slice(3)}`;
    },
  },
  mounted() {
    if (this.$store.state.listOfLayers.includes('trailLayer')) this.$store.commit('setTrailLayer', null);
  },
};
</script>

<style lang="scss" scoped>
// refactor as styling is reused from flight details
.details {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo-container {
  margin: auto;
  display: block;
  background-color: rgba(204, 204, 204, 0.2);
  padding: 2rem;
  width: min-content;
  border-radius: 50px;
}

.logo {
  margin: auto;
  display: block;
  width: auto;
  height: 30px;
}

.callsign {
  font-weight: 800;
}

.pilot {
  background-color: rgba(204, 204, 204, 0.2);
  padding: 0.25rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 1rem;
}

.label-cont {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 0 50%;
}

.four-row {
  flex: 1 0 21%;
}

.single-row {
  text-align: center;
  flex: 0 1 100%;
  width: max-content;
}

.data {
  font-weight: 800;
}

.section {
  width: 100%;
}

.section-body {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-bottom: 2px solid rgba(204, 204, 204, 0.2);
}

.vertical {
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.no-top {
  padding-top: 0;
}

.wide {
  padding-left: 1rem;
  padding-right: 1rem;
}

.subtitle {
  text-align: center;
  color: var(--lighter);
  font-size: 0.85rem;
}

#departure,
#arrival {
  color: var(--white);
  font-weight: 800;
  margin: 0;
}

.aircraft-details {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
}

.section-header {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 800;
}
</style>
