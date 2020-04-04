<template>
  <div class="screen">
    <div class="dials" :style="{width: halfRadiusEm, height: halfRadiusEm}">
      <div class="dial move" :style="[cssVars,{width: radiusEm, height: radiusEm}]">
        <div class="dial-background one"></div>
        <div class="dial-container container1" :style="{width: halfRadiusEm, left: halfRadiusEm}">
          <div
            class="wedge"
            :style="{
              width: halfRadiusEm,
              height: radiusEm,
              left: `-${halfRadiusEm}`,
              borderRadius: `${radiusEm} 0 0 ${radiusEm}`,
            }"
          />
        </div>
        <div class="dial-container container2" :style="{width: halfRadiusEm, left: 0}">
          <div
            class="wedge"
            :style="{
              width: halfRadiusEm,
              height: radiusEm,
              borderRadius: `0 ${radiusEm} ${radiusEm} 0`,
              left: halfRadiusEm,
            }"
          />
        </div>
        <div class="marker start"></div>
        <div class="marker end" :style="{transformOrigin: `50% ${halfRadiusEm}`}"></div>
      </div>
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
    centerColor: {
      type: String,
      default: '#fff',
    },
    radius: {
      type: Number,
      default: 8,
    },
    centerSize: {
      type: Number,
      default: 6,
    },
  },
  computed: {
    cssVars() {
      return {
        '--centerSize': `${this.centerSize}em`,
        '--backgroundColor': this.background,
        '--centerColor': this.centerColor,
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

.screen {
  margin-bottom: 2rem;
  position: relative;
  background: white;

  .dials {
    animation: show-dials 5s infinite ease-out;
    border-radius: 50%;
    position: absolute;
    top: 1.75em;
    left: 0;
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
    .wedge {
      position: absolute;
      top: 0;
      left: 0;
    }

    .container1 .wedge {
      animation: rotate-bg-dial-1-1 5s 0.2s linear infinite;
      background: var(--backgroundColor);
      transform-origin: 100% 50%;
    }

    .container2 .wedge {
      animation: rotate-bg-dial-1-2 5s 0.2s linear infinite;
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
      animation: rotate-marker-dial-1 5s 0.2s linear infinite;
    }
  }
}

/** Animations **/

@keyframes rotate-marker-dial-1 {
  0%,
  6% {
    transform: none;
  }
  28%,
  94% {
    transform: rotateZ(220deg);
  }
  95%,
  100% {
    transform: none;
  }
}

@keyframes rotate-bg-dial-1-1 {
  0%,
  6% {
    transform: rotateZ(0);
  }
  24%,
  94% {
    transform: rotateZ(180deg);
  }
  95%,
  100% {
    transform: rotateZ(0);
  }
}

@keyframes rotate-bg-dial-1-2 {
  24% {
    transform: rotateZ(0);
  }
  28%,
  94% {
    transform: rotateZ(40deg);
  }
  95%,
  100% {
    transform: rotateZ(0);
  }
}
</style>
