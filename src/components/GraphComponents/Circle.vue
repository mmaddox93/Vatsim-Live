<template>
  <div class="screen">
    <div class="dials" :style="{width: halfRadiusEm, height: halfRadiusEm}">
      <div class="dial move" :style="[cssVars,{width: radiusEm, height: radiusEm}]">
        <div class="rail-background"></div>
        <div class="dial-container container1" :style="{width: halfRadiusEm, left: halfRadiusEm}">
          <div
            class="half-circle"
            :style="[circleDegrees,{
              width: halfRadiusEm,
              height: radiusEm,
              left: `-${halfRadiusEm}`,
              borderRadius: `${radiusEm} 0 0 ${radiusEm}`,
            }]"
          />
        </div>
        <div class="dial-container container2" :style="{width: halfRadiusEm, left: 0}">
          <div
            class="half-circle"
            :style="[circleDegrees,{
              width: halfRadiusEm,
              height: radiusEm,
              borderRadius: `0 ${radiusEm} ${radiusEm} 0`,
              left: halfRadiusEm,
            }]"
          />
        </div>
        <div class="marker"></div>
        <div class="marker end" :style="[circleDegrees, {transformOrigin: `50% ${halfRadiusEm}`}]"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 65,
    },
    background: {
      type: String,
      default: '#32CBD4',
    },
    railColor: {
      type: String,
      default: '#163d3b',
    },
    centerColor: {
      type: String,
      default: '#030303',
    },
    radius: {
      type: Number,
      default: 7,
    },
  },
  computed: {
    cssVars() {
      return {
        '--centerSize': `${this.radius - 2}em`,
        '--backgroundColor': this.background,
        '--centerColor': this.centerColor,
        '--railColor': this.railColor,
      };
    },
    circleDegrees() {
      const percentage = this.percentage / 100;
      const totalDegrees = percentage * 360;
      let firstCircRadius = Number;
      let secondCircRadius = Number;
      let secondCircTiming = 0;
      let endTiming = 1;

      if (totalDegrees > 180) {
        firstCircRadius = 180;
        secondCircRadius = totalDegrees - 180;
        secondCircTiming = secondCircRadius * 0.005555; // 180-sec = 1 degree every 0.005* seconds
        endTiming = 1 + secondCircTiming;
      } else {
        firstCircRadius = totalDegrees;
        secondCircRadius = 0;
      }
      return {
        '--firstCircDeg': `${firstCircRadius}deg`,
        '--secondCircDeg': `${secondCircRadius}deg`,
        '--secondCircTiming': `${secondCircTiming}s`,
        '--endTiming': `${endTiming}s`,
        '--totalDeg': `${totalDegrees}deg`,
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
* {
  box-sizing: content-box;
}

.container {
  position: relative;

  .rail-background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    background-color: var(--railColor);
  }

  .dial {
    border-radius: 50%;
  }

  /**** DIAL 1 ****/
  .dial.move {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      z-index: 5;
      content: '';
      background: var(--centerColor);
      border-radius: 50%;
      width: var(--centerSize);
      height: var(--centerSize);
    }

    .dial-container {
      position: absolute;
      top: 0;
      bottom: 0;
      overflow: hidden;
    }

    .half-circle {
      position: absolute;
      top: 0;
      left: 0;
    }

    .container1 .half-circle {
      animation: rotate-bg-dial-1-1 1s linear forwards;
      background: var(--backgroundColor);
      transform-origin: 100% 50%;
    }

    .container2 .half-circle {
      animation: rotate-bg-dial-1-2 linear forwards;
      animation-delay: 1s;
      animation-duration: var(--secondCircTiming);
      background: var(--backgroundColor);
      transform-origin: 0 50%;
    }

    .marker {
      width: 1em;
      height: 1em;
      background: var(--backgroundColor);
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: calc(50% - 0.5em);
    }
    .end {
      animation: rotate-marker-dial-1 linear forwards;
      animation-duration: var(--endTiming);
    }
  }
}

/** Animations **/

@keyframes rotate-marker-dial-1 {
  0% {
    transform: none;
  }
  100% {
    transform: rotateZ(var(--totalDeg));
  }
}

@keyframes rotate-bg-dial-1-1 {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(var(--firstCircDeg));
  }
}

@keyframes rotate-bg-dial-1-2 {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(var(--secondCircDeg));
  }
}
</style>
