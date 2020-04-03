<template>
  <div
    class="FullCircle"
    :style="[cssVars,{ width: radiusEm, height: radiusEm, left: `calc(50% - ${halfRadiusEm})`}]"
  >
    <div class="rail" :style="{width: radiusEm, height: radiusEm, backgroundColor: railColor}" />
    <div
      class="half-circle-container container1"
      :style="{width: halfRadiusEm, left: halfRadiusEm}"
    >
      <div
        class="half-circle"
        :style="{background, height: radiusEm, width: halfRadiusEm, borderRadius: `0 ${radiusEm} ${radiusEm} 0`}"
      />
    </div>
    <div class="half-circle-container container2" :style="{width: halfRadiusEm, left: 0}">
      <div
        class="half-circle"
        :style="{
          background,
          height: radiusEm,
          width: halfRadiusEm,
          borderRadius: `${radiusEm} 0 0 ${radiusEm}`,
          transformOrigin: `${halfRadiusEm} ${halfRadiusEm}`
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      default: '#32CBD4',
    },
    railColor: {
      type: String,
      default: '#163d3b',
    },
    radius: {
      type: Number,
      default: 5,
    },
    centerSize: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    cssVars() {
      return {
        '--centerSize': `${this.centerSize}em`,
      };
    },
    halfRadiusEm() {
      return `${this.radius / 2}em`;
    },
    radiusEm() {
      return `${this.radius}em`;
    },
  },
};
</script>

<style lang="scss" scoped>
.FullCircle {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.FullCircle::after {
  content: '';
  background: var(--primary);
  border-radius: 50%;
  width: var(--centerSize);
  height: var(--centerSize);
  z-index: 5;
}

.rail {
  position: absolute;
  border-radius: 50%;
}

.half-circle-container {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

.container1 .half-circle {
  animation: rotate-bg-1 4s infinite linear;
  left: 0;
  transform-origin: 0 50%;
}

.container2 .half-circle {
  animation: rotate-bg-2 4s infinite linear;
}

@keyframes rotate-bg-1 {
  50%,
  100% {
    transform: rotateZ(180deg);
  }
}

@keyframes rotate-bg-2 {
  0%,
  50% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(180deg);
  }
}
</style>
